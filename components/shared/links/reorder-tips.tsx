import { Card, CardContent } from "@/components/ui/card";

export default function ReorderTips({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Reordering Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag and drop links to reorder them</li>
          <li>• Use the arrow buttons for precise positioning</li>
          <li>• The first link will appear at the top of your profile</li>
          <li>• Put your most important links first</li>
        </ul>
      </CardContent>
    </Card>
  );
}
