"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/components/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, totalItems } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-transparent py-4 text-foreground" // Remove backdrop-blur when menu open to fix CSS containing block bug
          : isScrolled || pathname !== "/"
          ? "bg-background/90 backdrop-blur-md border-b border-border/40 py-4 text-foreground"
          : "bg-transparent py-6 text-foreground"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -ml-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5 font-light" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-light tracking-widest uppercase transition-colors hover:text-foreground/70 ${
                pathname === link.href ? "text-foreground font-medium" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="text-sm font-light tracking-widest uppercase transition-colors hover:text-foreground/70 text-foreground/80">
              Admin
            </Link>
          )}
        </nav>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 mx-auto md:mx-0">
          <h1 className="font-heading text-2xl md:text-3xl tracking-[0.2em] font-normal uppercase">
            Saashelyn
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 flex-1">
          <button aria-label="Search" className="hidden md:block text-foreground/80 hover:text-foreground transition-colors">
            <Search className="w-5 h-5 font-light" />
          </button>
          <Link href={isAuthenticated ? "/profile" : "/login"} aria-label="Account" className="hidden md:block text-foreground/80 hover:text-foreground transition-colors">
            <User className="w-5 h-5 font-light" />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 font-light" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-full h-screen border-r border-border/50 z-50 p-8 flex flex-col md:hidden"
              style={{ backgroundColor: "#F6F3ED" }}
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-heading text-xl tracking-widest uppercase">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground/70 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-light tracking-wider uppercase ${
                      pathname === link.href ? "text-primary font-medium" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link href="/admin" className="text-lg font-light tracking-wider uppercase text-foreground/80">
                    Admin
                  </Link>
                )}
                {isAuthenticated ? (
                  <Link href="/profile" className="text-lg font-light tracking-wider uppercase text-foreground/80">
                    My Account
                  </Link>
                ) : (
                  <Link href="/login" className="text-lg font-light tracking-wider uppercase text-foreground/80">
                    Sign In
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
