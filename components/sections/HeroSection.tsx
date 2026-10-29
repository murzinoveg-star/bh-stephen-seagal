import Image from "next/image";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-white px-2 sm:px-4 lg:px-6">
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center overflow-hidden rounded-[32px] bg-brand-blue lg:rounded-[48px]">
        
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
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-8">
              
              {/* Изменено: clamp(1.5rem, ...) + break-words */}
              <h1 className="break-words text-[clamp(1.5rem,6.5vw,5.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:leading-[0.95]">
                Благотворительный фонд Стивена Сигала
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-8 sm:text-lg lg:text-xl">
                Помогаем там, где нужна поддержка: участникам СВО, детям,
                животным и старшим.
              </p>

              {/* Изменено: кнопки на всю ширину на мобильных */}
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                <Button href="/donate" variant="primary" className="w-full justify-center sm:w-auto">
                  Пожертвовать
                </Button>
                <Button href="/help-request" variant="secondary" className="w-full justify-center sm:w-auto">
                  Мне нужна помощь
                </Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}