import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Flavors from "@/components/Flavors";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import OrderForm from "@/components/OrderForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
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
        <OrderForm />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
