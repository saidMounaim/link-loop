import { LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  checkProfileExists,
  getProfileByUsername,
} from "@/lib/actions/profiles";
import UpdateProfileForm from "@/components/shared/forms/update-profile-form";

export default async function UpdateProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const { username } = await params;

  const checkUsername = await checkProfileExists(username);

  if (!checkUsername) notFound();

  const profile = await getProfileByUsername(username);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Update profile
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Update your profile
            </h1>
          </div>
          <div className="space-y-6">
            <UpdateProfileForm
              username={username}
              initialProfile={{
                avatar: profile?.avatar || "",
                displayName: profile?.name || "",
                bio: profile?.bio || "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
