import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "blue" | "link";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  as?: "link" | "span";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-brand-black hover:bg-[#00d0ff]",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-md",
  ghost: "text-white hover:text-brand-teal",
  blue:
    "bg-brand-blue text-white hover:bg-[#0a3fad]",
  link:
    "text-brand-blue hover:text-brand-blue/80", // Базовый цвет для текстовой ссылки
};

export default function Button({
  href = "#",
  children,
  variant = "primary",
  className = "",
  as = "link"
}: ButtonProps) {
  // Проверяем, является ли ссылка внешней
  const isExternal = href.startsWith("http") || href.startsWith("//");

  // Отрисовка текстовой ссылки (со стрелкой и подчеркиванием)
  if (variant === "link") {
    const linkClasses = `group inline-flex items-center gap-2 font-semibold ${className}`;
    const content = (
      <>
        <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
          {children}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </>
    );

    // Если передан as="span", возвращаем span (чтобы не вкладывать <a> в <a>)
    if (as === "span") {
      return <span className={linkClasses}>{content}</span>;
    }
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={linkClasses}>
        {content}
      </Link>
    );
  }
  
  // Базовые классы обычной кнопки
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  );
}