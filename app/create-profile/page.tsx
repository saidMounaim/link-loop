import CreateProfile from "@/components/shared/profile/create-profile";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfiles } from "@/lib/actions/profiles";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CreateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  const profiles = await getProfiles(session.user.id);
  console.log(profiles.length);
  return (
    <>
      {profiles.length === 0 && <CreateProfile />}
      {profiles.length > 0 && (
        <div className="min-h-screen bg-gradient-to-br from-white-50 via-white to-white-50">
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Create Profile
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="container mx-auto my-7 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg shadow mb-6">
            <strong>Note:</strong> You can only create one profile for now.
          </div>
        </div>
      )}
    </>
  );
}
