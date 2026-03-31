"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/menu") {
    return pathname.startsWith("/menu");
  }

  return false;
}

export function PublicHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setIsMenuOpen(false);

    if (href === "/menu") {
      router.push("/menu");
      return;
    }

    if (href === "/") {
      router.push("/");
      return;
    }

    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);

      if (pathname === "/") {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", href);
          return;
        }
      }

      router.push(href);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary/8 bg-[#F3E8DC]/80 backdrop-blur-sm">
      <Container className="px-5 sm:px-6 lg:px-8">
        <div className="flex min-h-[92px] items-center justify-between gap-6 py-4 sm:min-h-[98px] sm:py-5 md:min-h-[104px] md:py-6">
            <Link
              href="/"
              aria-label="Lilyas Bakery home"
              className="inline-flex items-center"
            >
              <Image
                src="/brand/lilyas-bakery-logo.svg"
                alt="Lilyas Bakery logo"
                priority
                width={438}
                height={270}
                className="h-[58px] w-auto sm:h-[64px] md:h-[70px]"
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-6 md:flex lg:gap-8"
            >
              {navLinks.map((link) => {
                const isActive = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={cn(
                      "relative font-sans text-[0.95rem] font-medium tracking-[0.06em] text-[#2B2B2B] transition-colors duration-200 ease-out hover:text-primary",
                      isActive &&
                      "text-secondary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-secondary/55 after:content-['']",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center rounded-full text-secondary transition-colors duration-200 ease-out hover:bg-section md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-px w-5 bg-current transition-transform duration-200 ease-out",
                    isMenuOpen && "translate-y-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-5 bg-current transition-opacity duration-200 ease-out",
                    isMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-5 bg-current transition-transform duration-200 ease-out",
                    isMenuOpen && "-translate-y-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>

        <div
          className={cn(
            "grid overflow-hidden border-t border-secondary/8 transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden",
            isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <nav
            id="mobile-navigation"
            aria-label="Mobile"
            className="min-h-0 overflow-hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const isActive = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={cn(
                      "rounded-xl px-2 py-3 font-sans text-[0.95rem] font-medium tracking-[0.06em] text-[#2B2B2B] transition-colors duration-200 ease-out hover:text-primary",
                      isActive && "text-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
