import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}

export default function ProfileLivePreview({ profile }: { profile: Profile }) {
  return (
    <div className="sticky top-24">
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Live Preview</span>
          </CardTitle>
          <CardDescription>See how your profile will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
                    {profile.displayName
                      ? profile.displayName.charAt(0).toUpperCase()
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">
                    {profile.displayName || "Your Name"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    @{profile.username || "username"}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {profile.bio || "Your bio will appear here..."}
                  </p>
                </div>
                <div className="w-full space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-center font-medium text-sm opacity-50">
                    Your links will appear here
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center font-medium text-sm opacity-30">
                    Add links after creating profile
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
