"use client";

import { useState } from "react";
import Image from "next/image";

// Иконка для надзаголовка
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

const FOUNDERS = [
  {
    id: "seagal",
    name: "Стивен Сигал",
    role: "Соучредитель, представитель МИД России по вопросам российско-американских гуманитарных связей, актёр",
    quote: "«Сила имеет значение только тогда, когда она направлена на защиту и помощь другим. Если у нас есть возможность изменить чью-то жизнь к лучшему, нужно действовать. Фонд — это способ помогать там, где это действительно необходимо, брать на себя ответственность и видеть реальный результат этой помощи.»",
    image: "/seagal.jpg",
  },
  {
    id: "zamarin",
    name: "Михаил Замарин",
    role: "Соучредитель, член генсовета «Деловой России», предприниматель",
    quote: "«Я привык объединять людей и превращать идеи в реальные дела. Для меня фонд — возможность направить этот опыт на помощь тем, кому сегодня трудно. Хочу, чтобы наши общие усилия давали человеку поддержку в нужный момент, силы двигаться дальше и уверенность, что он не один.»",
    image: "/zamarin.jpg",
  },
  {
    id: "evstigneev",
    name: "Дмитрий Евстигнеев",
    role: "Соучредитель, адвокат",
    quote: "«Мы хотим быть рядом с теми, кто сегодня защищает наше настоящее, окружать заботой тех, кому мы обязаны своим прошлым, и поддерживать тех, в ком живёт наше будущее. Потому что настоящая помощь — это не просто добрые дела. Это благодарность тем, кто был до нас, поддержка тех, кто рядом сегодня, и ответственность перед теми, кто придёт после нас.»",
    image: "/evstigneev.jpg",
  }
];

export default function FoundersSection() {
  const [activeId, setActiveId] = useState(FOUNDERS[0].id);
  
  const activeFounder = FOUNDERS.find(f => f.id === activeId) || FOUNDERS[0];

  return (
    <section className="relative bg-brand-black py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Шапка секции с разделителем */}
        <div className="mb-12 border-b border-white/10 pb-10 lg:mb-16 lg:pb-14">
          <div className="mb-6 flex items-center gap-1">
            <span className="flex items-center justify-center text-brand-teal">
              <IconIntersect size={20} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Слова основателей
            </span>
          </div>

          {/* Разделенный заголовок с разной прозрачностью */}
          <h2 className="max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] break-words hyphens-auto">
            <span className="text-white/50">У каждого из учредителей свой путь, опыт и причины </span>
            <span className="text-white">заниматься благотворительностью</span>
          </h2>
        </div>

        {/* Основной контент */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Левая часть: Фото (6 колонок) */}
          <div className="lg:col-span-6 flex justify-start">
            <div className="relative aspect-square w-40 sm:w-64 lg:w-full max-w-[400px] overflow-hidden rounded-[32px] bg-white/5 lg:rounded-[48px]">
              
              {activeFounder.image && (
                <Image
                  key={activeFounder.id} 
                  src={activeFounder.image}
                  alt={activeFounder.name}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                />
              )}
              
              {/* Заглушка (удалите, когда добавите фото) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-2 sm:w-12 sm:h-12">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[10px] uppercase tracking-widest sm:text-xs">Фото {activeFounder.name.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* Правая часть: Текст и Табы (6 колонок) */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            
            <div className="min-h-[300px] transition-all duration-300">
              <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl break-words">
                {activeFounder.name}
              </h3>
              
              <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base lg:text-lg">
                {activeFounder.role}
              </p>

              <blockquote className="mt-8">
                <p className="text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                  {activeFounder.quote}
                </p>
              </blockquote>
            </div>

            {/* Табы (сетка 2x2 на мобильных) */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-8">
              {FOUNDERS.map((founder) => (
                <button
                  key={founder.id}
                  onClick={() => setActiveId(founder.id)}
                  className={`group relative flex w-full items-center text-left text-sm font-medium transition-colors duration-300 sm:w-auto sm:text-base ${
                    activeId === founder.id
                      ? "text-brand-teal"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {founder.name}
                  {/* Активная линия под табом */}
                  <span 
                    className={`absolute -bottom-1 left-0 h-[2px] w-full bg-brand-teal transition-transform duration-300 origin-left ${
                      activeId === founder.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    }`} 
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}