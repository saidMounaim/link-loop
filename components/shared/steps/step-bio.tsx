import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}

export default function StepBio({
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
          <span>Tell Your Story</span>
        </CardTitle>
        <CardDescription>
          Write a bio that describes who you are and what you do
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            placeholder="Content creator passionate about technology, design, and helping others build their online presence. I share tips, tutorials, and insights about web development and digital marketing."
            value={profile.bio}
            onChange={(e) => updateProfile("bio", e.target.value)}
            rows={6}
            className="resize-none text-base"
            maxLength={160}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              A compelling bio helps visitors understand who you are
            </p>
            <span
              className={`text-sm ${
                profile.bio.length > 140 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              {profile.bio.length}/160
            </span>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Bio Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Mention what you do or your profession</li>
            <li>• Include your interests or passions</li>
            <li>• Add a call-to-action or what visitors can expect</li>
            <li>• Keep it friendly and authentic</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
