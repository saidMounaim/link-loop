"use client";

import { useTransition } from "react";
import { incrementLinkClicks } from "@/lib/actions/links";

export default function TrackedLink({
  link,
  children,
}: {
  link: { id: string; url: string };
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(async () => {
      console.log(isPending);
      await incrementLinkClicks(link.id);
      window.open(link.url, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <a
      href={link.url}
      onClick={handleClick}
      className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 font-semibold text-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-3 group"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
