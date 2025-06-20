"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateProfileHeader from "@/components/shared/profile/create-profile-header";
import ProfileProgress from "@/components/shared/profile/profile-progress";
import ProfileLivePreview from "@/components/shared/profile/profile-live-preview";
import StepBasicInfo from "@/components/shared/steps/step-basic-info";
import StepBio from "@/components/shared/steps/step-bio";
import StepProfilePicture from "@/components/shared/steps/step-profile-picture";
import ProfileNavigation from "@/components/shared/profile/profile-navigation";

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}

export default function CreateProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    username: "",
    bio: "",
    avatar: "",
    displayName: "",
  });

  const updateProfile = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          profile.displayName.trim() !== "" && profile.username.trim() !== ""
        );
      case 2:
        return profile.bio.trim() !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CreateProfileHeader currentStep={currentStep} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ProfileProgress progressPercentage={progressPercentage} />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <StepBasicInfo
                  profile={profile}
                  updateProfile={updateProfile}
                />
              )}
              {currentStep === 2 && (
                <StepBio profile={profile} updateProfile={updateProfile} />
              )}
              {currentStep === 3 && (
                <StepProfilePicture
                  profile={profile}
                  updateProfile={updateProfile}
                />
              )}
              <ProfileNavigation
                currentStep={currentStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleComplete={handleComplete}
                isStepValid={isStepValid}
                isLoading={isLoading}
              />
            </div>
            <div className="lg:col-span-1">
              <ProfileLivePreview profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
