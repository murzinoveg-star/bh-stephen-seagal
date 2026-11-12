import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка синей стрелки для списка
function IconArrowRight({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Иконки для карточки СВО
function IconPsych({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s-7-4.3-7-9.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 3.5C19 16.7 12 21 12 21z" />
    </svg>
  );
}

function IconLegal({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// Иконка для карточки детей (Мишка)
function IconTeddyBear({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="5" />
      <circle cx="6" cy="8" r="3" />
      <circle cx="18" cy="8" r="3" />
      <circle cx="10" cy="13" r="1" />
      <circle cx="14" cy="13" r="1" />
      <path d="M11 16h2" />
    </svg>
  );
}

function IconUsers({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M16 14.5a5 5 0 016 4.3" />
    </svg>
  );
}

function IconPaw({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="10" r="1.7" />
      <circle cx="18" cy="10" r="1.7" />
      <circle cx="9" cy="5.8" r="1.7" />
      <circle cx="15" cy="5.8" r="1.7" />
      <path d="M7.2 14.2a5 5 0 019.6 0c.4 1.5-.9 3.1-2.4 3.1h-4.8c-1.5 0-2.8-1.6-2.4-3.1z" />
    </svg>
  );
}

type Variant = "svo" | "visual";

interface Program {
  id: string;
  title: string;
  list?: string[];
  href: string;
  image?: string;
  variant: Variant;
  Icon?: ComponentType<IconProps>;
}

const PROGRAMS: Program[] = [
  {
    id: "svo",
    title: "Поддержка участников СВО, ветеранов и их семей",
    href: "/programs/svo-participants",
    variant: "svo",
  },
  {
    id: "children",
    title: "Лечение детей с тяжёлыми заболеваниями",
    list: [
      "Финансируем необходимые лекарства, операции, медицинские процедуры и другие этапы восстановления.",
      "Открываем сборы на лечение детей и привлекаем средства, необходимые для их помощи.",
    ],
    href: "/programs/children",
    image: "/programs/children.jpg",
    variant: "visual",
    Icon: IconTeddyBear,
  },
  {
    id: "elderly",
    title: "Помощь пенсионерам, которым особенно нужна забота",
    list: [
      "Помогаем пожилым людям получать необходимые лекарства, медицинские приборы и всё, что нужно для поддержания здоровья.",
      "Обеспечиваем продуктами и базовыми вещами тех, кто нуждается в материальной поддержке.",
    ],
    href: "/programs/elderly",
    image: "/programs/elderly.jpg",
    variant: "visual",
    Icon: IconUsers,
  },
  {
    id: "animals",
    title: "Помощь животным и приютам",
    list: [
      "Финансируем ветеринарные обследования, операции, вакцинацию и необходимые медицинские препараты.",
      "Обеспечиваем животных кормом, средствами ухода и другими необходимыми вещами на время пребывания в приюте или у волонтёров.",
      "Поддерживаем приюты и организации, которые ежедневно заботятся о животных: помогаем с содержанием, закупками и обустройством пространства.",
    ],
    href: "/programs/animals",
    image: "/programs/animals.jpg",
    variant: "visual",
    Icon: IconPaw,
  },
];

function ImageBackground({
  src,
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div className={`absolute inset-0 bg-brand-black ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 to-neutral-900" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 bg-brand-black ${className}`}>
      <Image
        src={src}
        alt="Изображение программы"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

function SvoCard({ program }: { program: Program }) {
  return (
    <Link
      href={program.href}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/30 sm:p-8 lg:p-12"
      style={{
        backgroundImage: "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
      }}
    >
      {/* Фоновое изображение: правый нижний угол, крупно, за контентом */}
      <div className="pointer-events-none absolute hidden md:block bottom-0 right-0 z-0 translate-x-[20%] translate-y-[84%] w-[50vw] -scale-x-100">
        <Image
          src="/heart_dark.png"
          alt=""
          width={800}
          height={800}
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] sm:text-3xl lg:text-4xl">
          {program.title}
        </h3>

        <div className="my-6 h-px w-full bg-white/20 sm:my-8" />

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <IconPsych size={24} />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white lg:text-xl">
              Психологическая помощь
            </h4>
            <p className="max-w-prose text-sm leading-relaxed text-white/90 lg:text-base">
              Бесплатные психологические консультации со специалистами для
              участников боевых действий, ветеранов и их близких — при пережитой
              утрате, травматическом опыте, тревоге и сложностях с возвращением
              к мирной жизни.
            </p>
          </div>

          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <IconLegal size={24} />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white lg:text-xl">
              Юридическая помощь
            </h4>
            <p className="max-w-prose text-sm leading-relaxed text-white/90 lg:text-base">
              Юридическая помощь в вопросах выплат, льгот и социальных гарантий.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-start lg:mt-auto lg:pt-8">
          <Button as="span" variant="link" className="text-white">
            Подробнее
          </Button>
        </div>
      </div>
    </Link>
  );
}

function VisualCard({ program }: { program: Program }) {
  const Icon = program.Icon;

  return (
    <Link
      href={program.href}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/10 md:flex-row"
    >
      {/* Левая часть: Контент (с паддингами) */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-12">
        <div>
          {/* Иконка над заголовком */}
          {Icon && (
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue">
              <Icon size={24} />
            </div>
          )}

          <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-brand-black sm:text-3xl lg:text-4xl">
            {program.title}
          </h3>

          {/* Список с синими стрелками */}
          <ul className="mt-5 space-y-3">
            {program.list?.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-brand-blue">
                  <IconArrowRight size={20} />
                </span>
                <span className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex justify-start">
          <Button as="span" variant="link" className="text-brand-blue">
            Подробнее
          </Button>
        </div>
      </div>

      {/* Правая часть: Изображение */}
      <div className="relative min-h-[250px] w-full overflow-hidden order-first rounded-b-3xl md:order-last md:w-1/2 md:rounded-l-3xl md:rounded-tr-none md:rounded-br-none">
        <ImageBackground
          src={program.image}
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

function ProgramCard({ program }: { program: Program }) {
  if (program.variant === "svo") return <SvoCard program={program} />;
  return <VisualCard program={program} />;
}

export default function ProgramsCardsSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-16 sm:py-16 lg:py-16">
      <div className="grid-blue pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]" />

      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        <div className="mb-8 sm:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Направления фонда
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
