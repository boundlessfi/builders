"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Explore", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Builders", href: "/builders" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-sm"
          : "bg-background/60 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logos/SVG_Coloured/BNDLSS__Colored icon.svg"
              alt="Boundless Logo"
              width={32}
              height={32}
            />
          </div>
          <span className="font-heading text-lg font-bold tracking-wide text-foreground">
            Boundless{" "}
            <span className="text-aqua-marine">Builders</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-x-1 -bottom-[13px] h-0.5 rounded-full bg-aqua-marine"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="pointer-events-none ml-4 hidden select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </button>
          <Button
            size="sm"
            className="rounded-lg bg-aqua-marine text-rangoon-green font-semibold hover:bg-aqua-marine/90 transition-all gap-1.5"
          >
            Join Platform
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-aqua-marine/10 text-aqua-marine"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-3 pb-1">
                <Button
                  className="w-full rounded-lg bg-aqua-marine text-rangoon-green font-semibold hover:bg-aqua-marine/90 justify-center gap-1.5"
                  size="sm"
                >
                  Join Platform
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
