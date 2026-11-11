"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Главная", href: "/" },
  { label: "О фонде", href: "/about" },
  { label: "Программы", href: "/programs" },
  { label: "Как помочь", href: "/donate" },
  { label: "Отчётность", href: "/reports" },
  { label: "Мне нужна помощь", href: "/help-request" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // P2.7: Закрытие мобильного меню по Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header className="relative z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-6 sm:py-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center"
          aria-label="БФ Стивена Сигала"
        >
          <Image
            src="/logo.svg"
            alt="БФ Стивена Сигала"
            width={200}
            height={50}
            className="h-8 w-auto object-contain sm:h-10 lg:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-black/70 transition-colors hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-0">
          <div className="flex items-center text-xs font-semibold">
            <button className="text-brand-black" aria-label="Русский">
              RU
            </button>
            <span className="mx-1.5 text-brand-black/30">/</span>
            <button
              className="text-brand-black/50 transition-colors hover:text-brand-black"
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="text-brand-black lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-gray-100 bg-white px-4 pb-6 pt-2 shadow-xl sm:px-6 lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-brand-black/70 hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
