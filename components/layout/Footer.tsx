import Link from "next/link";
import { Share2, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/40 border-t border-border/30 pt-16 pb-8 text-foreground/80 text-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-heading text-xl font-normal tracking-widest mb-6 uppercase text-foreground">
              Saashelyn
            </h3>
            <p className="font-light leading-relaxed mb-6">
              A pursuit of permanence through the art of fine tailoring and quiet luxury.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4 font-light" />
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="Website">
                <Globe className="w-4 h-4 font-light" />
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="Email">
                <Mail className="w-4 h-4 font-light" />
              </Link>
            </div>
          </div>

          {/* Links: Boutique */}
          <div>
            <h4 className="font-medium tracking-widest uppercase text-xs mb-6 text-foreground">Boutique</h4>
            <ul className="space-y-4 font-light text-xs tracking-wide">
              <li>
                <Link href="/collection" className="hover:text-foreground transition-colors uppercase">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors uppercase">
                  Atelier
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors uppercase">
                  Boutiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Support */}
          <div>
            <h4 className="font-medium tracking-widest uppercase text-xs mb-6 text-foreground">Support</h4>
            <ul className="space-y-4 font-light text-xs tracking-wide">
              <li>
                <Link href="/care" className="hover:text-foreground transition-colors uppercase">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground transition-colors uppercase">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors uppercase">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-medium tracking-widest uppercase text-xs mb-6 text-foreground">Newsletter</h4>
            <p className="font-light mb-6 text-xs leading-relaxed">
              Join the fold for exclusive access to upcoming collections.
            </p>
            <form className="relative border-b border-border pb-2 group">
              <input
                type="email"
                placeholder="E-MAIL ADDRESS"
                className="w-full bg-transparent border-none outline-none font-light text-xs tracking-wider placeholder:text-foreground/40 placeholder:uppercase"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity"
                aria-label="Subscribe"
              >
                <span className="text-lg leading-none font-light">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30 text-[10px] font-light tracking-widest uppercase">
          <p>&copy; 2024 SAASHELYN. CRAFTED WITH INTENT.</p>
          <div className="flex gap-8">
            <Link href="/sustainability" className="hover:text-foreground transition-colors">
              Sustainability
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
