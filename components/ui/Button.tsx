import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "blue";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-brand-black hover:bg-[#00d0ff]",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-md",
  ghost: "text-white hover:text-brand-teal",
  blue:
    "bg-brand-blue text-white hover:bg-[#0a3fad]"
};

export default function Button({
  href = "#",
  children,
  variant = "primary",
  className = ""
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}