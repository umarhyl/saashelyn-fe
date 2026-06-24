import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative pt-20">
        <div className="text-center w-full max-w-5xl px-4 flex flex-col items-center">
          <h1 className="font-heading text-primary flex items-baseline justify-center tracking-[0.1em] uppercase">
            <span className="text-8xl md:text-[14rem] leading-none">S</span>
            <span className="text-5xl md:text-[7rem] tracking-[0.2em] ml-2 md:ml-4">AASHELYN</span>
          </h1>
          <p className="mt-4 md:mt-8 text-xl md:text-3xl font-medium tracking-wide">Clothing Brand</p>
          <div className="w-full max-w-4xl mx-auto h-[2px] bg-foreground/60 mt-8 mb-16"></div>
        </div>
        <div className="absolute bottom-16 text-2xl md:text-3xl font-medium tracking-tight">
          by Apipi Team
        </div>
      </section>

      {/* Members */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-medium mb-6 tracking-tight">Members</h2>
        <div className="w-20 h-[2px] bg-foreground/80 mb-16"></div>
        
        <div className="space-y-8 text-xl md:text-2xl font-light tracking-tight">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border/40 pb-4">
            <span>Umar</span>
            <span className="text-muted-foreground">5027251005</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border/40 pb-4">
            <span>Muhammad Syadzili Abdul Muhyi</span>
            <span className="text-muted-foreground">5027251030</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border/40 pb-4">
            <span>Nayla Arsha Adyuta</span>
            <span className="text-muted-foreground">5027251042</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border/40 pb-4">
            <span>Nabila Sharliz Sigit</span>
            <span className="text-muted-foreground">5027251054</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4">
            <span>Azhari Rahma Putri</span>
            <span className="text-muted-foreground">5027251114</span>
          </div>
        </div>
      </section>

      {/* About Saashelyn */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] mb-6 tracking-tight">
          About<br/>Saashelyn
        </h2>
        <div className="w-20 h-[2px] bg-foreground/80 mb-20"></div>
        
        <p className="text-3xl md:text-4xl font-light leading-snug tracking-tight">
          Namanya lahir dari dua hal — nama owner di baliknya, dan kata <span className="italic font-normal">sash</span> yang berarti selempang kehormatan.
        </p>
      </section>

      {/* About Our Logo */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <div className="flex-1 w-full">
          <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] mb-6 tracking-tight">
            About Our<br/>Logo
          </h2>
          <div className="w-20 h-[2px] bg-foreground/80 mb-16"></div>
          <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight">
            Logonya adalah jarum dan benang — alat paling sederhana, tapi tanpa keduanya tidak ada satu pun pakaian yang bisa lahir.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white rounded-[3rem] p-12 shadow-sm flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/assets/images/home/hero-logo.png" alt="Saashelyn Logo" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* About Our Tagline */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto mb-20">
        <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] mb-6 tracking-tight">
          About Our<br/>Tagline
        </h2>
        <div className="w-20 h-[2px] bg-foreground/80 mb-20"></div>
        
        <div className="border border-primary/20 bg-white/40 rounded-2xl py-16 px-8 md:px-16 mb-16 text-center shadow-sm">
          <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light italic text-primary">
            "Wear The Thread of You"
          </h3>
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight">
            "Wear The Thread of You" — kenakan identitasmu, ceritamu, karaktermu yang unik. SAASHELYN hadir untuk mereka yang berani punya identitas sendiri.
          </p>
        </div>
      </section>

    </div>
  );
}
