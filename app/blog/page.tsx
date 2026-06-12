import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — After Dark Cannabis | York",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from After Dark Cannabis in York.",
  alternates: {
    canonical: "https://afterdarkcannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
