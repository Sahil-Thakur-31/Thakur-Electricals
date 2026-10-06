import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/floating-actions";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <Products />
        <Stats />
        <About />
        <CtaBanner />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
