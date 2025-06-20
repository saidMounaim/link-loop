import { Progress } from "@/components/ui/progress";

export default function ProfileProgress({
  progressPercentage,
}: {
  progressPercentage: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Your Profile
        </h1>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}
