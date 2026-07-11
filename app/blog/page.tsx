import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "After Dark Cannabis Blog | Cannabis Menu Guides",
  description: "Read After Dark Cannabis cannabis menu guides, flower tier notes, and local store checks for York shoppers.",
  alternates: {
    canonical: "https://afterdarkcannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
