import { LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddLinkForm from "@/components/shared/forms/add-link-form";
import LinksList from "@/components/shared/links/links-list";
import ReorderTips from "@/components/shared/links/reorder-tips";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getLinks } from "@/lib/actions/links";
import { checkProfileExists } from "@/lib/actions/profiles";

export default async function LinksPage({
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

  const initialLinks = await getLinks(username);

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
                Manage Links
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Your Links
            </h1>
            <p className="text-gray-600">
              Add, edit, and reorder your links. Drag links to change their
              order.
            </p>
          </div>
          <div className="space-y-6">
            <AddLinkForm username={username} />
            <LinksList initialLinks={initialLinks} />
            <ReorderTips show={initialLinks.length > 1} />
          </div>
        </div>
      </div>
    </div>
  );
}
