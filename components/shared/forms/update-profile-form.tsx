"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/profiles";

interface UpdateProfileFormProps {
  username: string;
  initialProfile: {
    avatar: string;
    displayName: string;
    bio: string;
  };
}

export default function UpdateProfileForm({
  username,
  initialProfile,
}: UpdateProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const response = await updateProfile(username, profile);
      if (response.success) {
        toast.success("Profile updated successfully!");
        setIsLoading(false);
      } else {
        toast.error(response.error || "Failed to update profile.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating your profile.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Image URL</Label>
          <Input
            id="avatar"
            placeholder="https://example.com/your-photo.jpg"
            value={profile.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayName">Full Name</Label>
          <Input
            id="displayName"
            placeholder="Your full name"
            value={profile.displayName}
            onChange={(e) => handleChange("displayName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            value={profile.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
          />
        </div>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
          onClick={handleUpdateProfile}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
