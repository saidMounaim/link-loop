import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { ArrowRight, Star, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const Hero = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          <Star className="w-4 h-4 mr-2" />
          Trusted by 50M+ creators
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
          One link for everything you are
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Share your content, grow your audience, and turn your passion into
          profit with one simple link.
        </p>
        {!session && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}

        <div className="max-w-sm mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">@yourname</h3>
                  <p className="text-gray-600 text-sm">
                    Content Creator & Entrepreneur
                  </p>
                </div>
                <div className="w-full space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-center font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    My YouTube Channel
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    Latest Blog Post
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    Shop My Store
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Hero;
