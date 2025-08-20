import React, { useEffect, useMemo, useState } from "react";
import { smoothScrollTo } from './SmoothScrollTo';

const cn = (...args) => args.filter(Boolean).join(" ");

const Logo = ({ src, alt = "Logo", href = "#" }) => (
    <a href={href} className="inline-flex items-center gap-2">
        {src ? (
            <img src={src} alt={alt} className="h-20 w-auto" />
        ) : (
            <div className="h-8 w-8 rounded-lg bg-yellow-400" aria-hidden />
        )}
    </a>
);

const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4 decoration-2 decoration-yellow-400"
    >
        {children}
    </a>
);

const CTAButton = ({ label, href, onClick }) => (
    <a
        href={href || "#"}
        onClick={onClick}
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-300 shadow-sm transition"
    >
        {label}
    </a>
);

const MobileMenuButton = ({ open, toggle }) => (
    <button
        onClick={toggle}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            {open ? (
                <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                />
            ) : (
                <path
                    fillRule="evenodd"
                    d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
                    clipRule="evenodd"
                />
            )}
        </svg>
    </button>
);

export default function Header({
    logo,
    navItems = [
        { label: "Características", href: "#features" },
        { label: "Precios", href: "#pricing" },
        { label: "Testimonios", href: "#testimonials" },
        { label: "Contacto", href: "#contact" },
    ],
    cta = { label: "Comenzar" },
    height = 72,
    compactHeight = 60,
    transparentUntilScroll = false,
    className,
    accent = "yellow",
}) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const resolvedHeight = scrolled ? compactHeight : height;

    const accentBorder = useMemo(
        () => `border-b-2 border-${accent}-400`,
        [accent]
    );

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? cn(
                        "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
                    )
                    : transparentUntilScroll
                        ? "bg-transparent"
                        : "bg-white",
                className
            )}
            style={{ height: resolvedHeight }}
        >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo {...logo} />

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(item.href); // Ej: "#why_zono"
          }}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4 decoration-2 decoration-yellow-400 cursor-pointer"
        >
          {item.label}
        </button>
      ))}
    </nav>

                <div className="hidden lg:flex items-center gap-3">
                    {cta?.label && <CTAButton {...cta} />}
                </div>

                <MobileMenuButton open={open} toggle={() => setOpen((v) => !v)} />
            </div>

            {/* Mobile drawer */}
            <div
                className={cn(
                    "lg:hidden origin-top overflow-hidden border-t border-gray-200 bg-white transition-all duration-300",
                    open ? "max-h-96" : "max-h-0"
                )}
            >
                <div className="px-4 pb-4 pt-2">
                    <div className="flex flex-col">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="py-2 text-base font-medium text-gray-800 hover:text-gray-900"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    {cta?.label && (
                        <div className="mt-3">
                            <CTAButton {...cta} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
