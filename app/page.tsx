import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { fetchProducts } from "@/lib/api";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function Home() {
  const products = await fetchProducts();
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/home/hero-bg.png"
            alt="SAASHELYN Hero Background"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-background/20" />
        </div>

        <FadeIn direction="up" className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 mt-20">
          <div className="flex-1 text-left">
            <p className="text-sm tracking-[0.3em] uppercase mb-6 font-medium text-foreground/80">
              The New Season
            </p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight font-normal text-foreground">
              Wear the thread<br />
              <span className="italic font-light">of you</span>
            </h1>
            <Link href="/collection">
              <Button size="lg" className="tracking-widest uppercase font-light rounded-none px-8 py-6 bg-primary/90 hover:bg-primary text-primary-foreground">
                View Collection
              </Button>
            </Link>
          </div>

          <div className="flex-1 flex justify-center w-full lg:-ml-12">
            {/* Logo */}
            <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px]">
              <Image
                src="/assets/images/home/hero-logo.png"
                alt="SAASHELYN Hero Logo"
                fill
                sizes="(max-width: 768px) 350px, (max-width: 1024px) 600px, 750px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <FadeIn direction="up">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-wide">Featured Collection</h2>
              </div>
              <Link
                href="/collection"
                className="hidden md:inline-block text-sm tracking-widest uppercase font-medium border-b border-foreground/30 hover:border-foreground pb-1 transition-colors"
              >
                Shop All
              </Link>
            </div>
            <ProductGrid products={featuredProducts} />

            <div className="mt-12 text-center md:hidden">
              <Link href="/collection">
                <Button variant="outline" className="tracking-widest uppercase font-light w-full">
                  Shop All
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 md:px-8 bg-secondary/30">
        <FadeIn delay={0.2} direction="up">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-normal tracking-wide mb-8">
              Crafted with Intent
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/80 mb-10 max-w-2xl mx-auto">
              SAASHELYN embodies the pursuit of permanence through the art of fine tailoring and quiet luxury. Every piece is designed to drape beautifully, move gracefully, and empower the modern woman who embraces modest fashion without compromising on style.
            </p>
            <Link href="/about">
              <Button variant="outline" className="tracking-widest uppercase font-light rounded-none">
                Discover Our Story
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-24 px-4 md:px-8 bg-background">
          <FadeIn direction="up">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-wide mb-4">Best Sellers</h2>
                <p className="font-light tracking-wide text-muted-foreground uppercase text-sm">
                  Our most loved pieces
                </p>
              </div>
              <ProductGrid products={bestSellers} />
            </div>
          </FadeIn>
        </section>
      )}
    </div>
  );
}
