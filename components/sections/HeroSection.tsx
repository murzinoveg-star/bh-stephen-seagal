import Image from "next/image";
import Button from "../ui/Button";

// Иконка для надзаголовка
function IconIntersect({
  className = "",
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
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
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative bg-white px-2 sm:px-4 lg:px-6">
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center overflow-hidden rounded-3xl bg-brand-blue lg:rounded-[48px]">
        {/* Фоновое изображение (скрыто на мобильных) */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <Image
            src="/hero_bg.jpg"
            alt="Благотворительный фонд Стивена Сигала"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Мобильный градиент (вместо фото) */}
        <div className="absolute inset-0 z-0 block bg-gradient-to-br from-brand-blue to-[#1a4fc4] sm:hidden" />

        {/* Затемняющие градиенты для десктопа */}
        <div className="absolute inset-0 z-0 hidden sm:block bg-gradient-to-r from-brand-blue/95 via-brand-blue/60 to-transparent" />
        <div className="absolute inset-0 z-0 hidden sm:block bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

        {/* Основной контент */}
        <div className="relative z-10 mx-auto w-full max-w-7xl pb-5 pt-10 px-5 md:py-20 md:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-8">
              <h1 className="break-words text-[clamp(1.5rem,6.5vw,5.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:leading-[0.95]">
                Благотворительный фонд Стивена Сигала
              </h1>

              {/* Блок с миссией в новом стиле */}
              <div className="mt-6 max-w-3xl sm:mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center text-brand-teal">
                    <IconIntersect size={20} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Наша миссия
                  </span>
                </div>

                <p className="text-base leading-relaxed text-white/90 sm:text-lg lg:text-2xl">
                  «Мы улучшаем качество жизни, возвращая людям и тем, кто им
                  дорог, уверенность в завтрашнем дне, веру в доброту и
                  справедливость»
                </p>
              </div>

              {/* Кнопки */}
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                <Button
                  href="/donate"
                  variant="primary"
                  className="w-full justify-center sm:w-auto"
                >
                  Помочь
                </Button>
                <Button
                  href="/programs"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                >
                  Наши проекты
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
