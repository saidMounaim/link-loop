import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon, Users, Zap } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything you need to succeed
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful features to help you grow your audience and monetize your
          content
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Unlimited Links</h3>
            <p className="text-gray-600">
              Add as many links as you want and organize them perfectly
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Optimized for speed with instant loading times
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track clicks, views, and engagement with detailed insights
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;
