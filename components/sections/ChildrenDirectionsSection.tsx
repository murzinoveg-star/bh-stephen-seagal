import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка «медицинский крест» — финансирование лечения
function IconMedical({ className = "", size = 24 }: IconProps) {
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
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
    </svg>
  );
}

// Иконка «рука с сердцем» — привлечение благотворительных средств
function IconDonation({ className = "", size = 24 }: IconProps) {
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
      <path d="M12 8.5s-3-2.5-3-4.5a3 3 0 016 0c0 2-3 4.5-3 4.5z" />
      <path d="M3 14h4l3 2 4-1 5 3" />
      <path d="M21 18l-4 3H8l-5-4" />
    </svg>
  );
}

// Иконка «сердце» — надежда / результат помощи
function IconHeart({ className = "", size = 24 }: IconProps) {
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

interface Direction {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<IconProps>;
}

const DIRECTIONS: Direction[] = [
  {
    id: "treatment",
    title: "Финансирование лечения",
    description:
      "Направляем средства на необходимые операции, медицинские процедуры, лекарственные препараты и этапы восстановления в соответствии с назначениями лечащих врачей.",
    Icon: IconMedical,
  },
  {
    id: "fundraising",
    title: "Привлечение благотворительных средств",
    description:
      "Организуем сбор пожертвований для финансирования медицинской помощи детям, чьи семьи не могут самостоятельно обеспечить необходимое лечение.",
    Icon: IconDonation,
  },
];

export default function ChildrenDirectionsSection() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок секции */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Программа включает два направления
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

        {/* Плашка: о результатах лечения */}
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
                <IconHeart size={24} />
              </div>

              <div>
                <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                  Независимо от сложности заболевания
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-lg">
                  Не каждое тяжелое заболевание поддаётся полному излечению. В
                  одних случаях медицинская помощь даёт ребенку шанс на
                  выздоровление, в других — позволяет облегчить симптомы и
                  предотвратить осложнения. Поэтому наша задача — обеспечить
                  детям доступ к необходимому лечению независимо от сложности
                  заболевания и возможных результатов терапии.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}