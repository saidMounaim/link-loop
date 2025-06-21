import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import {
  checkProfileExists,
  getProfileByUsername,
} from "@/lib/actions/profiles";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const checkUsername = await checkProfileExists(username);

  if (!checkUsername) notFound();

  const profile = await getProfileByUsername(username);

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
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 font-semibold text-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-3 group"
                    >
                      {link.emoji && (
                        <span className="text-xl">{link.emoji}</span>
                      )}
                      <small className="flex-1 text-center">{link.title}</small>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
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
