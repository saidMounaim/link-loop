import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CreateProfileHeader({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
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
        <div className="text-sm text-gray-500">Step {currentStep} of 3</div>
      </div>
    </header>
  );
}
