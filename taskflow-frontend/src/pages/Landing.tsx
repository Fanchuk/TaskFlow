import Hero from "../components/landing/Hero";
import Integrations from "../components/landing/Integrations";
import Features from "../components/landing/Features";
import Advantages from "../components/landing/Advantages";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";

export default function Landing() {
  return (
    <>
      <Hero />
      <Integrations />
      <Features />
      <Advantages />
      <Pricing />
      <Testimonials />
      <CTA /> 
    </>
  );
}