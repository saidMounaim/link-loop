import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function ProfileNavigation({
  currentStep,
  handleBack,
  handleNext,
  handleComplete,
  isStepValid,
  isLoading,
}: {
  currentStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleComplete: () => void;
  isStepValid: () => boolean;
  isLoading: boolean;
}) {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 1}
        className="px-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      {currentStep < 3 ? (
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={handleComplete}
          disabled={isLoading}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Creating Profile...
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Complete Profile
            </>
          )}
        </Button>
      )}
    </div>
  );
}
