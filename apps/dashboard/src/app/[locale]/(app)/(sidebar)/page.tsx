import { PageChat } from "@/components/chat/chat-page"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant | Travelese",
};

export default function Page() {
  return (
    <div className="mt-4 h-[calc(113vh-200px)]">
      <PageChat />
    </div>
  );
}

