import Button from "../ui/Button";

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-black px-8 py-16 lg:px-16 lg:py-24">
          {/* Мягкие блобы */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand-blue/50 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-16 h-[380px] w-[380px] rounded-full bg-brand-teal/25 blur-[110px]"
          />

          {/* Модульная сетка */}
          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />

          {/* Декоративные «петли Мёбиуса» в правом верхнем углу */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="spin-slow pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-brand-teal/30"
          />

          <div className="relative grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Левая колонка: заголовок + текст */}
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
                Помогите там,
                <br />
                где это важно
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
                Ваше пожертвование помогает фонду развивать программы и
                оказывать поддержку в рамках заявленных направлений.
              </p>
            </div>

            {/* Правая колонка: CTA */}
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Button
                href="/donate"
                variant="primary"
                className="w-full justify-center lg:w-auto"
              >
                Пожертвовать
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>

              <span className="text-center text-[11px] uppercase tracking-[0.2em] text-white/40 lg:text-right">
                Безопасный платёж
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}