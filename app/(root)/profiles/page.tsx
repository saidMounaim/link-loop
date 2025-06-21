import { getProfiles } from "@/lib/actions/profiles";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/shared/cards/profile-card";

export default async function MyProfiles() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const profiles = await getProfiles(session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800">My Profiles</h1>
      </header>
      {profiles && profiles.length === 0 && (
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No profiles found. Create one to get started!
          </h2>
        </div>
      )}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.username} profile={profile} />
        ))}
      </main>
    </div>
  );
}
