import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Flavors from "@/components/Flavors";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import OrderForm from "@/components/OrderForm";
// import EmailCapture from "@/components/EmailCapture"; // DISABLED: newsletter subscription feature temporarily disabled
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingOrderButton from "@/components/FloatingOrderButton";
import SectionHashTracker from "@/components/SectionHashTracker";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <About />
        <Flavors />
        <Portfolio />
        <Reviews />
        <FAQ />
        <HowItWorks />
        <OrderForm />
        {/* <EmailCapture /> */}{/* DISABLED: newsletter subscription feature temporarily disabled */}
        <Contact />
      </main>
      <Footer />
      <FloatingOrderButton />
      <ScrollToTop />
      <SectionHashTracker />
    </>
  );
}
