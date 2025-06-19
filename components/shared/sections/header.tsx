import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LinkLoop
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
