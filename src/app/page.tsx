import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Flavors from "@/components/Flavors";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import OrderForm from "@/components/OrderForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Flavors />
        <Portfolio />
        <Reviews />
        <Pricing />
        <OrderForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
