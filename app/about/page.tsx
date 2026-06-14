import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        <div className="text-center mb-20">
          <h1 className="font-heading text-4xl md:text-5xl font-normal tracking-wide mb-6">Our Story</h1>
          <p className="font-light tracking-wide text-muted-foreground uppercase text-sm max-w-2xl mx-auto leading-relaxed">
            A pursuit of permanence through the art of fine tailoring and quiet luxury.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center mb-24">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-muted/30">
              <Image
                src="/assets/images/about/atelier.jpg"
                alt="SAASHELYN Atelier"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="font-heading text-3xl font-normal">The Vision</h2>
            <p className="font-light leading-relaxed text-foreground/80">
              SAASHELYN was born from a desire to redefine modest fashion. We believe that modesty and luxury are not mutually exclusive, but rather, they complement each other to create an aura of understated elegance.
            </p>
            <p className="font-light leading-relaxed text-foreground/80">
              Our vision is to provide the modern woman with a wardrobe that speaks volumes through its quiet refinement. We focus on structural integrity, premium fabrics, and timeless silhouettes that transcend fleeting trends.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-muted/30">
              <Image
                src="/assets/images/about/philosophy.jpg"
                alt="Design Philosophy"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="font-heading text-3xl font-normal">Design Philosophy</h2>
            <p className="font-light leading-relaxed text-foreground/80">
              Every SAASHELYN piece is a testament to our dedication to craftsmanship. We source only the finest materials—from lustrous silks to breathable linens—ensuring that each garment feels as exquisite as it looks.
            </p>
            <p className="font-light leading-relaxed text-foreground/80">
              Our color palette is intentionally restrained, focusing on neutral, earthy tones that allow the quality of the fabric and the precision of the cut to take center stage. This minimalist approach ensures that every piece can be seamlessly integrated into your existing wardrobe, offering endless versatility.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
