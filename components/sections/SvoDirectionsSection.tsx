import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка «сердце» — психологическая помощь
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

// Иконка «щит с галочкой» — юридическая помощь
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

// Иконка «семья» — родитель и ребёнок
function IconFamily({ className = "", size = 24 }: IconProps) {
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
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
      <circle cx="17" cy="9" r="2" />
      <path d="M15 21v-1a4 4 0 0 1 6-3.4" />
    </svg>
  );
}

interface Direction {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<IconProps>;
}

const DIRECTIONS: Direction[] = [
  {
    id: "psych",
    title: "Психологическая помощь",
    description:
      "Отголоски военных событий настигают людей в повседневной жизни, проявляясь в тревожных или депрессивных состояниях. Чтобы ветераны как можно скорее справились с последствиями и стали чувствовать себя спокойно, мы финансируем для них консультации психотерапевтов.",
    Icon: IconPsych,
  },
  {
    id: "legal",
    title: "Юридическая помощь",
    description:
      "За участие в специальной военной операции каждому участнику полагаются льготы. Фонд помогает ветеранам получить государственную поддержку: льготы и соцвыплаты.",
    Icon: IconLegal,
  },
];

export default function SvoDirectionsSection() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок секции */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Направления программы
          </h2>
        </div>

        {/* Две карточки направлений */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {DIRECTIONS.map(({ id, title, description, Icon }) => (
            <article
              key={id}
              className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 sm:p-8 lg:p-10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue">
                <Icon size={24} />
              </div>

              <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-brand-black sm:text-3xl">
                {title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Плашка: поддержка семей */}
        <div className="mt-4 sm:mt-6">
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
            }}
          >
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <IconFamily size={24} />
              </div>

              <div>
                <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                  Поддержка семей
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-lg">
                  Поддержка касается не только военных, но и членов их семей,
                  которые потеряли близких на фронте.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}