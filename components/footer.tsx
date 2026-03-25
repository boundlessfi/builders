import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { name: "Explore Products", href: "/products" },
    { name: "Find Builders", href: "/builders" },
    { name: "Submit a Product", href: "/products/submit" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Community Guidelines", href: "#" },
  ],
  Company: [
    { name: "About Boundless", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/SVG_Coloured/BNDLSS__Colored icon.svg"
                alt="Boundless"
                width={28}
                height={28}
              />
              <span className="font-heading text-base font-bold tracking-wide">
                Boundless <span className="text-aqua-marine">Builders</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The premier showcase platform for builders in the Stellar
              ecosystem. Discover, connect, and build.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Boundless. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
