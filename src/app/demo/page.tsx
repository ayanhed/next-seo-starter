import { Metadata } from "next";
import AllComponentsDemo from "@/components/AllComponentsDemo";

export const metadata: Metadata = {
  title: "Demo",
  description: "Demo page",
};

export default function DemoPage() {
  return <AllComponentsDemo />;
}
