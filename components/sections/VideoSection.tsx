"use client";

import { useState } from "react";

export default function VideoSection() {
  const [started, setStarted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-brand-black py-24 lg:py-32">
      {/* Мягкие блобы для глубины */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-brand-blue/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-teal/20 blur-[120px]"
      />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Левая колонка: заголовок + описание + подпись */}
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
              Обращение
              <br />
              Стивена Сигала
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 lg:text-lg">
              Здесь может быть размещено видеообращение основателя фонда.
              Материал нужно подготовить или согласовать.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Стивен Сигал
                </div>
                <div className="text-xs text-white/50">Основатель фонда</div>
              </div>
            </div>
          </div>

          {/* Правая колонка: видео-плеер / заглушка */}
          <div className="lg:col-span-8">
            <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-blue/40 via-brand-black to-brand-black shadow-2xl shadow-black/40">
              {/* Декоративный «паттерн-петля» */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40"
              >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-brand-teal/30" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-white/5" />
              </div>

              {!started ? (
                // Превью с кнопкой play
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center"
                  aria-label="Воспроизвести видеообращение Стивена Сигала"
                >
                  <span className="glass relative flex h-20 w-20 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-teal group-hover:text-brand-black">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-teal/30" />
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

                  <span className="glass rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
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