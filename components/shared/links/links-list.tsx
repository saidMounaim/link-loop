"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import LinkItem from "./link-item";
import { updateLink, orderLink } from "@/lib/actions/links";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface LinkItemType {
  id: string;
  profileId?: string;
  title: string;
  url: string;
  emoji: string | null;
  clicks: number;
  order: number;
}

export default function LinksList({
  initialLinks,
}: {
  initialLinks: LinkItemType[];
}) {
  const pathname = usePathname();
  const [editingLink, setEditingLink] = useState<string | null>(null);

  const startEditing = (link: LinkItemType) => {
    setEditingLink(link.id);
  };

  const cancelEdit = () => {
    setEditingLink(null);
  };

  const editLink = async (
    id: string,
    data: { title: string; url: string; emoji: string }
  ) => {
    try {
      const response = await updateLink(id, data, pathname);
      if (response.success) {
        toast.success("Link updated successfully!");
        setEditingLink(null);
      } else {
        toast.error(
          response.error || "Failed to update link. Please try again."
        );
      }
    } catch (error) {
      toast.error("Failed to edit link. Please try again.");
      console.log(error);
      setEditingLink(null);
    }
  };

  const moveLink = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const newLinks = [...initialLinks];
    const [movedLink] = newLinks.splice(fromIndex, 1);
    newLinks.splice(toIndex, 0, movedLink);

    const reorderedLinks = newLinks.map((link, idx) => ({
      ...link,
      order: idx,
    }));

    try {
      const response = await orderLink(
        reorderedLinks.map((l) => ({ id: l.id, order: l.order })),
        pathname
      );
      if (response.success) {
        toast.success("Link order updated!");
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      toast.error("Failed to update order.");
      console.log(error);
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) moveLink(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index < initialLinks.length - 1) moveLink(index, index + 1);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle>Your Links ({initialLinks.length})</CardTitle>
        <CardDescription>
          {
            "Drag links to reorder them, or use the arrow buttons. The order here is how they'll appear on your profile."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {initialLinks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <LinkIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No links yet</h3>
            <p className="text-sm mb-4">
              Add your first link using the form above!
            </p>
          </div>
        )}
        {initialLinks.map((link, idx) => (
          <LinkItem
            key={link.id}
            link={link}
            index={idx}
            total={initialLinks.length}
            onEdit={editLink}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            draggableProps={{}}
            isEditing={editingLink === link.id}
            startEditing={startEditing}
            cancelEdit={cancelEdit}
          />
        ))}
      </CardContent>
    </Card>
  );
}
