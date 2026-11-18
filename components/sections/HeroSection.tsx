import Image from "next/image";
import Button from "../ui/Button";

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
      <div
        className="relative mx-auto flex w-full max-w-[1920px] items-center overflow-hidden rounded-3xl lg:rounded-[48px]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
        }}
      >

       {/* Фоновое изображение: правый нижний угол, крупно, за контентом */}
             <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[95%]">
               <Image
                 src="/sigal_hero.png"
                 alt=""
                 width={600}
                 height={600}
                 className="h-full w-auto object-contain"
               />
             </div>

        {/* Основной контент (z-30) */}
        <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-5 pt-10 md:px-10 md:py-20">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-8">
              <h1 className="break-words text-[clamp(1.5rem,6.5vw,5.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:leading-[0.95]">
                Благотворительный фонд Стивена Сигала
              </h1>

              {/* Блок с миссией */}
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