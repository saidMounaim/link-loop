import Hero from "@/components/shared/sections/hero";
import Features from "@/components/shared/sections/features";
import CTA from "@/components/shared/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
