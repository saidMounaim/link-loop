import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}

export default function StepProfilePicture({
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
          <Camera className="w-5 h-5" />
          <span>Profile Picture</span>
        </CardTitle>
        <CardDescription>
          Add a profile picture to make your page more personal (optional)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl">
              {profile.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Image URL</Label>
              <Input
                id="avatar"
                placeholder="https://example.com/your-photo.jpg"
                value={profile.avatar}
                onChange={(e) => updateProfile("avatar", e.target.value)}
              />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">📸 Photo Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use a clear, high-quality image</li>
                <li>• Square images work best (1:1 ratio)</li>
                <li>• Show your face for better connection</li>
                <li>• Keep the background simple</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
