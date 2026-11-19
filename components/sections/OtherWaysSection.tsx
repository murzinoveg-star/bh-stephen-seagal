import type { ComponentType } from "react";

type IconProps = { className?: string; size?: number };

// Иконка «академическая шапочка» — специалисты / экспертиза
function IconExpert({ className = "", size = 24 }: IconProps) {
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
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

// Иконка «подарочная коробка» — передача вещей
function IconBox({ className = "", size = 24 }: IconProps) {
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
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <path d="M3 12h18" />
      <path d="M12 8v13" />
      <path d="M8.5 8c-.8 0-1.5-.7-1.5-1.5S7.7 5 8.5 5c1.6 0 3.5 3 3.5 3H8.5z" />
      <path d="M15.5 8c.8 0 1.5-.7 1.5-1.5S16.3 5 15.5 5c-1.6 0-3.5 3-3.5 3h3.5z" />
    </svg>
  );
}

// Иконка «конверт» — для плашки
function IconMail({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

interface Way {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<IconProps>;
}

const WAYS: Way[] = [
  {
    id: "specialists",
    title: "Помощь специалистов",
    description:
      "Приглашаем к сотрудничеству медицинские клиники, врачей, юристов и других специалистов, готовых участвовать в программах фонда. Если вы можете предложить профессиональную помощь или партнёрство, расскажите нам о своей специализации и возможном формате сотрудничества.",
    Icon: IconExpert,
  },
  {
    id: "things",
    title: "Передача вещей",
    description:
      "В рамках программ фонда вы можете передать пожилым людям одежду и товары первой необходимости, а приютам для животных корма, лежанки и средства ухода. Если вы готовы помочь, сообщите нам, какие вещи можете предоставить, чтобы мы согласовали их передачу.",
    Icon: IconBox,
  },
];

// TODO: уточнить, если для этого нужен отдельный ящик.
const CONTACT_EMAIL = "info@seagalfund.ru";

export default function OtherWaysSection() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок + вводный текст */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Другие способы помощи
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
            Помочь фонду можно не только пожертвованием, но и профессиональными
            услугами или необходимыми вещами.
          </p>
        </div>

        {/* Две карточки */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {WAYS.map(({ id, title, description, Icon }) => (
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

        {/* Плашка с email */}
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
                <IconMail size={24} />
              </div>

              <div>
                <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                  Напишите нам
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-lg">
                  Чтобы предложить профессиональную помощь или передать вещи,
                  напишите нам на{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-white underline underline-offset-2 hover:text-white/80"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  . Менеджер фонда свяжется с вами от 3 до 5 рабочих дней.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}