import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}

export default function StepBasicInfo({
  profile,
  updateProfile,
}: {
  profile: Profile;
  updateProfile: (field: keyof Profile, value: string) => void;
}) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Basic Information</span>
        </CardTitle>
        <CardDescription>
          {"Let's start with your name and username"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name *</Label>
          <Input
            id="displayName"
            placeholder="John Doe"
            value={profile.displayName}
            onChange={(e) => updateProfile("displayName", e.target.value)}
            className="text-lg"
          />
          <p className="text-sm text-gray-500">
            This is how your name will appear on your profile
          </p>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm bg-gray-100 px-3 py-2 rounded-md whitespace-nowrap">
              linkloop.com/
            </span>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) =>
                updateProfile(
                  "username",
                  e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                )
              }
              className="flex-1 text-lg"
              placeholder="johndoe"
            />
          </div>
          <p className="text-sm text-gray-500">
            Your unique URL. Only lowercase letters and numbers allowed.
          </p>
          {profile.username && (
            <p className="text-sm text-blue-600 font-medium">
              Your profile will be available at: linkloop.com/{profile.username}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
