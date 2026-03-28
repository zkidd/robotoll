import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import {
  Problem,
  Distinction,
  MachineTypes,
  HowItWorks,
  TaxLayers,
  ForGovernment,
  ForBusiness,
  Stats,
  CTA,
  Footer,
} from "@/components/marketing/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Distinction />
      <MachineTypes />
      <HowItWorks />
      <TaxLayers />
      <ForGovernment />
      <ForBusiness />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}
