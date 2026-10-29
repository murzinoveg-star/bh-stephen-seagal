import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

function IconShield({ className = "", size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconHeart({ className = "", size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s-7-4.3-7-9.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 3.5C19 16.7 12 21 12 21z" />
    </svg>
  );
}

function IconPaw({ className = "", size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="6" cy="10" r="1.7" />
      <circle cx="18" cy="10" r="1.7" />
      <circle cx="9" cy="5.8" r="1.7" />
      <circle cx="15" cy="5.8" r="1.7" />
      <path d="M7.2 14.2a5 5 0 019.6 0c.4 1.5-.9 3.1-2.4 3.1h-4.8c-1.5 0-2.8-1.6-2.4-3.1z" />
    </svg>
  );
}

function IconUsers({ className = "", size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M16 14.5a5 5 0 016 4.3" />
    </svg>
  );
}

type Variant = "featured" | "visual";

interface Program {
  id: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image?: string;
  Icon: ComponentType<IconProps>;
  variant: Variant;
}

const PROGRAMS: Program[] = [
  {
    id: "svo_participants",
    title: "Помощь участникам СВО",
    text: "Юридическая и психологическая помощь. Без спонсирования и покупки оборудования.",
    href: "/programs/svo-participants",
    cta: "Подробнее",
    Icon: IconShield,
    variant: "featured",
  },
  {
    id: "children",
    title: "Помощь детям",
    text: "Поддержка детей в рамках программы фонда.",
    href: "/programs/children",
    cta: "Подробнее",
    image: "/programs/children.jpg",
    Icon: IconHeart,
    variant: "visual",
  },
  {
    id: "animals",
    title: "Помощь животным",
    text: "Забота и помощь животным в рамках программы фонда.",
    href: "/programs/animals",
    cta: "Подробнее",
    image: "/programs/animals.jpg",
    Icon: IconPaw,
    variant: "visual",
  },
  {
    id: "elderly",
    title: "Помощь старикам",
    text: "Поддержка старших в рамках программы фонда.",
    href: "/programs/elderly",
    cta: "Подробнее",
    image: "/programs/elderly.jpg",
    Icon: IconUsers,
    variant: "visual",
  },
];

function ImageBackground({ src, className = "" }: { src?: string; className?: string }) {
  if (!src) {
    return (
      <div className={`absolute inset-0 bg-brand-black ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 to-neutral-900" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px]"
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 bg-brand-black ${className}`}>
      <Image
        src={src}
        alt="Фон программы"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
    </div>
  );
}

function FeaturedCard({ program }: { program: Program }) {
  const { title, text, href, cta, Icon } = program;

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-blue bg-brand-blue p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-2xl hover:shadow-brand-blue/30 lg:col-span-12 lg:row-span-1 lg:p-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,184,224,0.18),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 -right-10 h-[280px] w-[280px] opacity-10 lg:h-[400px] lg:w-[400px]"
      >
        <Image
          src="/logo-symbol-white.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-300 group-hover:bg-brand-teal group-hover:text-brand-black">
          <Icon size={26} />
        </span>
        
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-black transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-teal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>

      {/* Изменено: font-semibold -> font-medium, tracking-tight -> tracking-[-0.02em] */}
      <h3 className="relative mt-6 text-2xl font-medium leading-tight tracking-[-0.02em] lg:text-3xl">
        {title}
      </h3>

      <p className="relative mt-3 max-w-3xl text-sm leading-relaxed text-white/75">{text}</p>

      <span className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-white">
        <span className="border-b border-transparent pb-0.5 transition-all duration-300 group-hover:border-brand-teal">
          {cta}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function VisualCard({ program }: { program: Program }) {
  const { title, text, href, image } = program;

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl min-h-[400px] lg:min-h-[460px] lg:col-span-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/20"
    >
      <ImageBackground src={image} className="transition-transform duration-700 group-hover:scale-105" />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

      <div className="absolute right-5 top-5 z-20">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-black transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-teal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>

      <div className="relative z-20 p-6 lg:p-8">
        {/* Изменено: font-semibold -> font-medium, tracking-tight -> tracking-[-0.02em] */}
        <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-2">
          {text}
        </p>
      </div>
    </Link>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return program.variant === "featured" ? (
    <FeaturedCard program={program} />
  ) : (
    <VisualCard program={program} />
  );
}

export default function ProgramsCardsSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24 lg:py-32">
      <div className="grid-blue pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Наши программы
          </h2>

          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 self-start font-semibold text-brand-blue lg:self-auto"
          >
            <span className="border-b border-brand-blue/30 pb-0.5 transition-colors group-hover:border-brand-blue">
              Смотреть программы
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-auto lg:grid-cols-12">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}