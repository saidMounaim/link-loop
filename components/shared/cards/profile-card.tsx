"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProfile } from "@/lib/actions/profiles";
import { usePathname } from "next/navigation";

interface Profile {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  bio: string | null;
}

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const pathname = usePathname();
  const handleDelete = async (username: string) => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this profile? This action cannot be undone."
      );
      if (!confirmed) return;
      const response = await deleteProfile(username, pathname);
      if (response.success) {
        toast.success("Profile deleted successfully.");
      } else {
        toast.error(response.error || "Failed to delete profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("An error occurred while trying to delete the profile.");
    }
  };

  return (
    <div className="relative group">
      <Link href={`/links/${profile.username}`} className="block">
        <Card className="cursor-pointer bg-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all border-0 overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center space-y-5">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                {profile.avatar && <AvatarImage src={profile.avatar} />}
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full px-2 py-1 text-xs font-semibold shadow-lg">
                @{profile.username}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.name || profile.username}
            </h2>
            <p className="text-gray-600 text-center line-clamp-3">
              {profile.bio}
            </p>
            <Button size="sm" variant="secondary" className="w-full">
              View Links
            </Button>
          </CardContent>
        </Card>
      </Link>
      <button
        onClick={() => handleDelete(profile.username)}
        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
        title="Delete Profile"
        type="button"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
