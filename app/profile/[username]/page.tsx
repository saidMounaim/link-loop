import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import {
  checkProfileExists,
  getProfileByUsername,
  incrementProfileViews,
} from "@/lib/actions/profiles";
import { notFound } from "next/navigation";
import TrackedLink from "@/components/shared/profile/tracked-link";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const checkUsername = await checkProfileExists(username);

  if (!checkUsername) notFound();

  const profile = await getProfileByUsername(username);

  await incrementProfileViews(username);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6">
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                  {profile?.avatar && <AvatarImage src={profile.avatar} />}
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl">
                    {profile?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    @{profile?.username}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {profile?.bio}
                  </p>
                </div>

                <div className="w-full space-y-4">
                  {profile?.links.map((link) => (
                    <TrackedLink key={link.id} link={link}>
                      {link.emoji && (
                        <span className="text-xl">{link.emoji}</span>
                      )}
                      <small className="flex-1 text-center">{link.title}</small>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </TrackedLink>
                  ))}

                  {profile?.links.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <p>No links available</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
