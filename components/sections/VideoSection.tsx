"use client";

import { useState } from "react";

// Иконка для надзаголовка (как в TransparencySection)
function IconIntersect({ className = "", size = 18 }: { className?: string; size?: number }) {
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

// Иконка профиля для заглушки аватарки
function IconUser({ className = "", size = 24 }: { className?: string; size?: number }) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function VideoSection() {
  const [started, setStarted] = useState(false);

  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Левая колонка: Заголовок + описание + карточка автора */}
          <div className="lg:col-span-5 lg:pr-8">
            
            {/* Надзаголовок */}
            <div className="mb-6 flex items-center gap-1">
              <span className="flex items-center justify-center text-brand-blue">
                <IconIntersect size={20} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-black">
                Слово основателя
              </span>
            </div>

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              Обращение
              <br />
              Стивена Сигала
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">
              Здесь может быть размещено видеообращение основателя фонда.
              Материал нужно подготовить или согласовать.
            </p>

            {/* Карточка автора без подложки */}
            <div className="mt-8 flex items-center gap-4 sm:mt-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue sm:h-14 sm:w-14">
                <IconUser size={24} className="sm:hidden" />
                <IconUser size={28} className="hidden sm:block" />
              </div>
              <div>
                <div className="text-base font-medium text-brand-black sm:text-lg">
                  Стивен Сигал
                </div>
                <div className="mt-0.5 text-sm text-neutral-500">
                  Основатель фонда
                </div>
              </div>
            </div>

          </div>

          {/* Правая колонка: видео-плеер / заглушка */}
          <div className="lg:col-span-7">
            <div className="group relative aspect-video overflow-hidden rounded-3xl border border-neutral-200 bg-brand-black">
              
              {!started ? (
                // Превью с кнопкой play
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center"
                  aria-label="Воспроизвести видеообращение Стивена Сигала"
                >
                  <span className="glass relative flex h-16 w-16 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-teal group-hover:text-brand-black sm:h-20 sm:w-20">
                    <span className="absolute inset-0 motion-safe:animate-ping rounded-full bg-brand-teal/30" />
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="relative translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  <span className="glass rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-[11px]">
                    Видео скоро появится
                  </span>
                </button>
              ) : (
                // Заглушка после клика
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="text-brand-teal"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M3 15l4.5-4.5a2 2 0 012.8 0L15 15" />
                    <path d="M14 13l2.5-2.5a2 2 0 012.8 0L21 13" />
                    <circle cx="8.5" cy="9.5" r="1" />
                  </svg>
                  <p className="max-w-sm text-sm text-white/70">
                    Видеообращение готовится к публикации.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStarted(false)}
                    className="text-xs font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Назад
                  </button>
                </div>
              )}

              {/* Подпись «preview» в углу */}
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                Плейсхолдер
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}