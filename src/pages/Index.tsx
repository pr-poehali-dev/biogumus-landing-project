import { useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", type: "food", volume: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://functions.poehali.dev/65608b91-b0cb-491f-8c0d-9b8c9ee07471", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-eco-950 text-eco-100 min-h-screen overflow-x-hidden">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <ContentSections />
      <ReviewsSection />
      <ContactSection
        form={form}
        setForm={setForm}
        submitted={submitted}
        sending={sending}
        handleSubmit={handleSubmit}
        scrollTo={scrollTo}
      />
    </div>
  );
}