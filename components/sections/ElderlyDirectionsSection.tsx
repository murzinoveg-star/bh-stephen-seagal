import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка «стетоскоп» — медицинская помощь
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
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M5 3h2M13 3h2" />
      <path d="M9 13v3a5 5 0 0 0 10 0v-3" />
      <circle cx="19" cy="8" r="2" />
    </svg>
  );
}

// Иконка «коробка» — материальная поддержка
function IconPackage({ className = "", size = 24 }: IconProps) {
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
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

// Иконка «сердце в руках» — забота и качество жизни
function IconCare({ className = "", size = 24 }: IconProps) {
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
      <path d="M12 12.5s-3-2.4-3-4.4a2.8 2.8 0 0 1 5.6 0c0 2-2.6 4.4-2.6 4.4z" />
      <path d="M3 16h4l3 2 4-1 5 3" />
      <path d="M21 20l-4 2H8l-5-4" />
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
    id: "medical",
    title: "Медицинская помощь",
    description:
      "Финансируем приобретение лекарственных препаратов, назначенных врачами, и необходимых медицинских приборов: тонометры, глюкометры и другие средства для контроля состояния здоровья.",
    Icon: IconMedical,
  },
  {
    id: "material",
    title: "Материальная поддержка",
    description:
      "Обеспечиваем пожилых людей продуктовыми наборами, средствами личной гигиены, бытовой химией и другими товарами первой необходимости.",
    Icon: IconPackage,
  },
];

export default function ElderlyDirectionsSection() {
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

        {/* Плашка: цель программы */}
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
                <IconCare size={24} />
              </div>

              <div>
                <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                  Сохранить здоровье и качество жизни
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-lg">
                  Фонд стремится снизить финансовую нагрузку на пенсионеров и
                  помочь им сохранить здоровье и достойное качество жизни.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}