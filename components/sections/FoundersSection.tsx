"use client";

import { useState } from "react";
import Image from "next/image";

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

const FOUNDERS = [
  {
    id: "seagal",
    name: "Стивен Сигал",
    role: "Соучредитель, представитель МИД России по вопросам российско-американских гуманитарных связей, актёр",
    quote:
      "«Сила имеет значение только тогда, когда она направлена на защиту и помощь другим. Если у нас есть возможность изменить чью-то жизнь к лучшему, нужно действовать. Фонд — это способ помогать там, где это действительно необходимо, брать на себя ответственность и видеть реальный результат этой помощи.»",
    image: "/stiven_sigal.jpg",
  },
  {
    id: "zamarin",
    name: "Михаил Замарин",
    role: "Соучредитель, член генсовета «Деловой России», предприниматель",
    quote:
      "«Я привык объединять людей и превращать идеи в реальные дела. Для меня фонд — возможность направить этот опыт на помощь тем, кому сегодня трудно. Хочу, чтобы наши общие усилия давали человеку поддержку в нужный момент, силы двигаться дальше и уверенность, что он не один.»",
    image: "/stiven_sigal.jpg",
  },
  {
    id: "evstigneev",
    name: "Дмитрий Евстигнеев",
    role: "Соучредитель, адвокат",
    quote:
      "«Мы хотим быть рядом с теми, кто сегодня защищает наше настоящее, окружать заботой тех, кому мы обязаны своим прошлым, и поддерживать тех, в ком живёт наше будущее. Потому что настоящая помощь — это не просто добрые дела. Это благодарность тем, кто был до нас, поддержка тех, кто рядом сегодня, и ответственность перед теми, кто придёт после нас.»",
    image: "/stiven_sigal.jpg",
  },
];

export default function FoundersSection() {
  const [activeId, setActiveId] = useState(FOUNDERS[0].id);

  const activeIndex = FOUNDERS.findIndex((f) => f.id === activeId);
  const activeFounder = FOUNDERS[activeIndex] || FOUNDERS[0];

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + FOUNDERS.length) % FOUNDERS.length;
    setActiveId(FOUNDERS[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % FOUNDERS.length;
    setActiveId(FOUNDERS[newIndex].id);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#121C26] to-[#1a2a3c] py-16 sm:py-16 lg:py-16">
      {/* Фоновое изображение: правый нижний угол */}
      <div className="pointer-events-none absolute hidden lg:block bottom-0 right-0 z-0 w-[1100px] translate-x-[60%] translate-y-[40%]">
        <Image
          src="/heart_black.png"
          alt=""
          width={1200}
          height={1200}
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Шапка секции с разделителем */}
        <div className="mb-12 border-b border-white/10 pb-10 lg:mb-16 lg:pb-14">
          <div className="mb-6 flex items-center gap-1">
            <span className="flex items-center justify-center text-brand-teal">
              <IconIntersect size={20} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Слово учредителям
            </span>
          </div>

          <h2 className="max-w-4xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] break-words hyphens-auto">
            <span className="text-white/50">
              У каждого из учредителей свой путь, опыт и причины{" "}
            </span>
            <span className="text-white">заниматься благотворительностью</span>
          </h2>
        </div>

        {/* Основной контент */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Правая часть: Фото */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end lg:order-last">
            <div className="relative aspect-square w-40 sm:w-64 md:w-80 lg:w-full max-w-[400px] overflow-hidden rounded-3xl bg-white/5">
              {activeFounder.image && (
                <Image
                  key={activeFounder.id}
                  src={activeFounder.image}
                  alt={activeFounder.name}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                />
              )}
            </div>
          </div>

          {/* Левая часть: Текст и Табы */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full lg:order-first">
            <div className="min-h-[300px] transition-all duration-300">
              <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl break-words">
                {activeFounder.name}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg">
                {activeFounder.role}
              </p>

              <blockquote className="mt-8">
                <p className="text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                  {activeFounder.quote}
                </p>
              </blockquote>
            </div>

            {/* Десктопные табы */}
            <div className="mt-8 hidden lg:flex flex-row gap-3 sm:mt-10">
              {FOUNDERS.map((founder) => (
                <button
                  key={founder.id}
                  onClick={() => setActiveId(founder.id)}
                  className={`group flex items-start rounded-xl border py-2 px-4 text-center transition-all duration-300 ${
                    activeId === founder.id
                      ? "border-brand-teal bg-brand-teal/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 sm:text-base ${
                      activeId === founder.id
                        ? "text-white"
                        : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {founder.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Мобильные стрелки */}
            <div className="mt-8 flex lg:hidden items-center justify-between gap-4 sm:mt-10">
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                aria-label="Предыдущий учредитель"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <span className="text-sm font-medium tabular-nums text-white/50">
                {activeIndex + 1} / {FOUNDERS.length}
              </span>

              <button
                onClick={handleNext}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                aria-label="Следующий учредитель"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}