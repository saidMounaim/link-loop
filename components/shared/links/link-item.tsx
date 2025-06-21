/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { deleteLink } from "@/lib/actions/links";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface LinkItemProps {
  link: {
    id: string;
    title: string;
    url: string;
    emoji: string | null;
    clicks: number;
    profileId?: string;
  };
  index: number;
  total: number;
  onEdit: (
    id: string,
    data: { title: string; url: string; emoji: string }
  ) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  draggableProps: any;
  isEditing: boolean;
  startEditing: (link: any) => void;
  cancelEdit: () => void;
}

export default function LinkItem({
  link,
  index,
  total,
  onEdit,
  onMoveUp,
  onMoveDown,
  draggableProps,
  isEditing,
  startEditing,
  cancelEdit,
}: LinkItemProps) {
  const pathname = usePathname();

  const [editForm, setEditForm] = useState({
    title: link.title,
    url: link.url,
    emoji: link.emoji || "",
  });

  return (
    <div
      {...draggableProps}
      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 border group bg-gray-50 border-gray-200 hover:bg-gray-100`}
    >
      <div className="flex flex-col space-y-1">
        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab hover:text-gray-600" />
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveUp(index)}
            disabled={index === 0 || isEditing}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUp className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1 || isEditing}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowDown className="w-3 h-3" />
          </Button>
        </div>
      </div>
      {isEditing ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="🎥"
            value={editForm.emoji}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, emoji: e.target.value }))
            }
            className="text-center text-lg"
            maxLength={2}
          />
          <Input
            placeholder="Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="md:col-span-2"
          />
          <Input
            placeholder="URL"
            value={editForm.url}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm text-gray-500 font-mono">
              #{index + 1}
            </span>
            {link.emoji && <span className="text-lg">{link.emoji}</span>}
            <h3 className="font-medium text-gray-900 truncate">{link.title}</h3>
          </div>
          <p className="text-sm text-gray-500 truncate">{link.url}</p>
        </div>
      )}
      <div className="flex items-center space-x-2">
        {!isEditing && (
          <Badge variant="secondary" className="text-xs">
            {link.clicks} clicks
          </Badge>
        )}
        {isEditing ? (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onEdit(link.id, editForm);
              }}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={cancelEdit}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => startEditing(link)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                const confirmed = confirm(
                  "Are you sure you want to delete this link? This action cannot be undone."
                );
                if (!confirmed) return;
                const response = await deleteLink(
                  link.profileId!,
                  link.id,
                  pathname
                );
                if (response.success) {
                  toast.success("Link deleted successfully!");
                } else {
                  toast.error(
                    response.error || "Failed to delete link. Please try again."
                  );
                }
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
