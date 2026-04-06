import { SiteHeader } from '@/components/site/SiteHeader';
import { HeroSection } from '@/components/site/HeroSection';
import { AboutSection } from '@/components/site/AboutSection';
import { ProductsSection } from '@/components/site/ProductsSection';
import { SustainabilitySection } from '@/components/site/SustainabilitySection';
import { ServicesSection } from '@/components/site/ServicesSection';
import { TestimonialsSection } from '@/components/site/TestimonialsSection';
import { SectorsSection } from '@/components/site/SectorsSection';
import { CTASection } from '@/components/site/CTASection';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <SustainabilitySection />
      <ServicesSection />
      <TestimonialsSection />
      <SectorsSection />
      <CTASection />
      <SiteFooter />
    </div>
  );
}
