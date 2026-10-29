import Image from "next/image";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    // Внешняя секция: белый фон и отступы (создают эффект белых полей)
    <section className="relative bg-white px-2 sm:px-4 lg:px-6">
      
      {/* Внутренний контейнер (карточка): темный фон, скругления и скрытие переполнения */}
      <div className="relative flex min-h-[85vh] items-center overflow-hidden rounded-[32px] bg-brand-black lg:rounded-[48px]">
        
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_bg.jpg"
            alt="Благотворительный фонд Стивена Сигала"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Градиент для читаемости текста (слева направо) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/60 to-transparent" />
        
        {/* Дополнительный нижний градиент для плавного перехода */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

        {/* Основной контент */}
        {/* Уменьшил pt-40 до py-20 lg:py-32, так как items-center сам центрирует контент */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            {/* Заголовок, подзаголовок и CTA */}
            <div className="animate-fade-up lg:col-span-8">
              <h1 className="text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.03em] text-white">
                Благотворительный фонд Стивена Сигала
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 lg:text-xl">
                Помогаем там, где нужна поддержка: участникам СВО, детям,
                животным и старшим.
              </p>

              {/* Кнопки CTA — под подзаголовком */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/donate"
                  variant="primary"
                  className="justify-center"
                >
                  Пожертвовать
                </Button>
                <Button
                  href="/help-request"
                  variant="secondary"
                  className="justify-center"
                >
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