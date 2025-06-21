"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addLink } from "@/lib/actions/links";
import { usePathname } from "next/navigation";

export default function AddLinkForm({ username }: { username: string }) {
  const [newLink, setNewLink] = useState({ title: "", url: "", emoji: "" });

  const pathname = usePathname();

  const onAdd = async (link: { title: string; url: string; emoji: string }) => {
    try {
      const newLink = await addLink(username, link, pathname);
      if (newLink.success) {
        toast.success("Link added successfully!");
        setNewLink({ title: "", url: "", emoji: "" });
      } else {
        toast.error(newLink.error || "Failed to add link. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add link. Please try again.");
      console.error("Error adding link:", error);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add New Link</span>
        </CardTitle>
        <CardDescription>
          Create a new link to add to your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emoji">Emoji</Label>
            <Input
              id="emoji"
              placeholder="🎥"
              value={newLink.emoji}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, emoji: e.target.value }))
              }
              className="text-center text-lg"
              maxLength={2}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="My YouTube Channel"
              value={newLink.title}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              placeholder="https://youtube.com/@yourname"
              value={newLink.url}
              onChange={(e) =>
                setNewLink((prev) => ({ ...prev, url: e.target.value }))
              }
            />
          </div>
        </div>
        <Button
          onClick={() => {
            if (newLink.title && newLink.url) {
              onAdd(newLink);
              setNewLink({ title: "", url: "", emoji: "" });
            }
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={!newLink.title || !newLink.url}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </CardContent>
    </Card>
  );
}
