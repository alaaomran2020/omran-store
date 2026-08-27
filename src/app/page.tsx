import { Hero } from "@/components/Hero";
import { CatalogSection } from "@/components/CatalogSection";
import {
  FeaturedCategories,
  BrandAdvantages,
  FAQPreview,
  Newsletter,
} from "@/components/PremiumSections";
import { catalogProducts } from "@/lib/products";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd, itemListJsonLd, localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          localBusinessJsonLd(),
          itemListJsonLd(catalogProducts, "كتالوج ألعاب أطفال — عمران للألعاب"),
        ]}
      />
      <Hero />
      <FeaturedCategories />
      <CatalogSection />
      <BrandAdvantages />
      <AboutSection />
      <FAQPreview />
      <Newsletter />
      <ContactSection />
    </>
  );
}
