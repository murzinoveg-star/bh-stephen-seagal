// import Link from "next/link";
// import type { ReactNode } from "react";

// type Variant = "primary" | "secondary" | "ghost" | "blue";

// interface ButtonProps {
//   href?: string;
//   children: ReactNode;
//   variant?: Variant;
//   className?: string;
// }

// const variants: Record<Variant, string> = {
//   primary:
//     "bg-brand-teal text-brand-black hover:bg-[#00d0ff] shadow-lg shadow-brand-teal/25 hover:shadow-brand-teal/40",
//   secondary:
//     "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-md",
//   ghost: "text-white hover:text-brand-teal",
//   blue:
//     "bg-brand-blue text-white hover:bg-[#0a3fad] shadow-lg shadow-brand-blue/25"
// };

// export default function Button({
//   href = "#",
//   children,
//   variant = "primary",
//   className = ""
// }: ButtonProps) {
//   return (
//     <Link
//       href={href}
//       className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
//     >
//       {children}
//     </Link>
//   );
// }

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
    "bg-brand-teal text-brand-black hover:bg-[#00d0ff] shadow-lg shadow-brand-teal/25 hover:shadow-brand-teal/40",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-md",
  ghost: "text-white hover:text-brand-teal",
  blue:
    "bg-brand-blue text-white hover:bg-[#0a3fad] shadow-lg shadow-brand-blue/25"
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