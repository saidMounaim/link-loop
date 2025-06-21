import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import SignInForm from "@/components/shared/forms/sign-in-form";
import SignUpForm from "@/components/shared/forms/sign-up-form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinkTree
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="font-medium">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-medium">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-0">
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </TabsContent>

              <TabsContent value="signup" className="space-y-0">
                <CardTitle className="text-xl">Create Account</CardTitle>
                <CardDescription>
                  Create a new account to get started with LinkTree
                </CardDescription>
              </TabsContent>
            </CardHeader>

            <CardContent>
              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>

              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>

              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
