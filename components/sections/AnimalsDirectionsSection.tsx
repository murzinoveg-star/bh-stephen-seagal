import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка «лапа с крестом» — ветеринарная помощь
function IconVet({ className = "", size = 24 }: IconProps) {
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
      <circle cx="6" cy="10" r="1.6" />
      <circle cx="18" cy="10" r="1.6" />
      <circle cx="9" cy="5.8" r="1.6" />
      <circle cx="15" cy="5.8" r="1.6" />
      <path d="M7.2 14.2a5 5 0 019.6 0c.4 1.5-.9 3.1-2.4 3.1h-4.8c-1.5 0-2.8-1.6-2.4-3.1z" />
    </svg>
  );
}

// Иконка «миска с кормом» — питание и уход
function IconFood({ className = "", size = 24 }: IconProps) {
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
      <path d="M3 12h18" />
      <path d="M4 12a8 8 0 0 0 16 0" />
      <path d="M9 8c0-1.5 1.3-3 3-3s3 1.5 3 3" />
      <circle cx="8" cy="10" r="0.5" fill="currentColor" />
      <circle cx="12" cy="9.5" r="0.5" fill="currentColor" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" />
    </svg>
  );
}

// Иконка «домик» — поддержка приютов
function IconShelter({ className = "", size = 24 }: IconProps) {
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
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

// Иконка «сердце в руках» — общая задача фонда
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
    id: "vet",
    title: "Ветеринарная помощь",
    description:
      "Финансируем обследования, хирургические операции, вакцинацию и приобретение препаратов для лечения и восстановления животных.",
    Icon: IconVet,
  },
  {
    id: "food",
    title: "Питание и уход",
    description:
      "Направляем средства на закупку сухих и влажных кормов, лежанок, подстилок, пелёнок, наполнителей и других необходимых товаров для ежедневного ухода за животными.",
    Icon: IconFood,
  },
  {
    id: "shelter",
    title: "Поддержка приютов",
    description:
      "Помогаем с содержанием и обустройством помещений, приобретением необходимого оборудования и созданием безопасных и комфортных условий.",
    Icon: IconShelter,
  },
];

export default function AnimalsDirectionsSection() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок секции */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Программа включает три направления
          </h2>
        </div>

        {/* Три карточки направлений */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {DIRECTIONS.map(({ id, title, description, Icon }) => (
            <article
              key={id}
              className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 sm:p-8 lg:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue">
                <Icon size={24} />
              </div>

              <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-brand-black sm:text-3xl lg:text-2xl">
                {title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Плашка: общая задача фонда */}
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
                  Пока не найдётся новый дом
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-lg">
                  Задача фонда — помочь приютам обеспечить бездомных животных
                  необходимым питанием, лечением и уходом, пока для них не
                  найдётся новый дом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}