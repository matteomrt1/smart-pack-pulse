import { SiteHeader } from '@/components/site/SiteHeader';
import { HeroSection } from '@/components/site/HeroSection';
import { ProductsSection } from '@/components/site/ProductsSection';
import { SustainabilitySection } from '@/components/site/SustainabilitySection';
import { ServicesSection } from '@/components/site/ServicesSection';
import { SectorsSection } from '@/components/site/SectorsSection';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <ProductsSection />
      <SustainabilitySection />
      <ServicesSection />
      <SectorsSection />
      <SiteFooter />
    </div>
  );
}
