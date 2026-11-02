"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type IconProps = { className?: string; size?: number };

function IconShield({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconUsers({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M16 14.5a5 5 0 016 4.3" />
    </svg>
  );
}

export default function AboutShortSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const updateScroll = () => {
      requestRef.current = undefined;

      if (window.innerWidth < 1024) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const scrollTop = -rect.top;
      const maxScroll = rect.height - window.innerHeight;

      // Защита от деления на ноль, при этом не прерываем выполнение
      let rawProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      rawProgress = Math.max(0, Math.min(1, rawProgress));

      const delay = 0.15;
      let progress = (rawProgress - delay) / (1 - delay);
      progress = Math.max(0, Math.min(1, progress));

      const container = track.parentElement;
      if (!container) return;

      const style = window.getComputedStyle(container);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);
      
      const containerContentWidth = container.clientWidth - paddingLeft - paddingRight;
      const maxTranslate = track.scrollWidth - containerContentWidth;
      
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    const handleScroll = () => {
      // Проверяем именно undefined, так как rAF может вернуть 0
      if (requestRef.current !== undefined) return;
      requestRef.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Первичный вызов
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
        // ОЧЕНЬ ВАЖНО: сбрасываем ссылку, иначе в Strict Mode следующий mount заблокируется
        requestRef.current = undefined; 
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white lg:h-[300vh]">
      
      <div className="lg:sticky lg:top-0 flex h-auto flex-col justify-center overflow-hidden py-16 sm:py-24 lg:h-screen lg:py-0">
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          
          <div className="mb-10 lg:mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              Помощь, которую можно понять
            </h2>
          </div>

          <div 
            ref={trackRef}
            className="flex flex-col gap-6 lg:w-[max-content] lg:flex-row lg:gap-8 will-change-transform"
          >
            
            {/* Карточка 1 (Синяя) */}
            <div 
              className="group relative flex flex-col overflow-hidden rounded-3xl p-6 text-white sm:p-8 lg:w-[600px] lg:p-12 lg:h-[400px]"
              style={{ backgroundImage: "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)" }}
            >
              <div 
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.2) 0px,
                    rgba(255, 255, 255, 0.2) 3px,
                    transparent 3px,
                    transparent 12px
                  )`,
                  maskImage: `radial-gradient(circle at 90% 125%, black 0%, transparent 60%)`,
                  WebkitMaskImage: `radial-gradient(circle at 90% 125%, black 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-medium lg:text-4xl">
                  О фонде
                </h3>
                <p className="max-w-md text-base leading-relaxed text-white/85 lg:text-lg">
                  БФ Стивена Сигала — благотворительный фонд, работающий в РФ. 
                  Наша цель — объединять людей вокруг достоинства и заботы.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto pt-8 lg:pt-10">
                <Image
                  src="/logo-white.svg" 
                  alt="БФ Стивена Сигала"
                  width={250} 
                  height={75}
                  className="h-[50px] w-auto object-contain sm:h-[60px]"
                />
              </div>
            </div>

            {/* Карточка 2 (Светлая) */}
            <div 
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:w-[600px] lg:p-12 lg:h-[400px]"
            >
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[200px] translate-x-[25%] translate-y-[50%] sm:w-[500px]">
                <Image
  src="/infinity.png"
  alt=""
  width={400}
  height={400}
  loading="lazy"
  className="h-auto w-full object-contain"
/>
              </div>

              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-medium text-brand-black lg:text-4xl">
                  Наша задача
                </h3>
                <p className="max-w-md text-base leading-relaxed text-neutral-600 lg:text-lg">
                  Сделать помощь понятной: человеку должно быть ясно, куда обратиться, 
                  а донору — куда направляются средства. Мы за прозрачность на каждом этапе.
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-8 lg:pt-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white sm:h-14 sm:w-14">
                  <IconShield size={26} />
                </span>
              </div>
            </div>

            {/* Карточка 3 (Светлая) */}
            <div 
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:w-[600px] lg:p-12 lg:h-[400px]"
            >
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[200px] rotate-90 -scale-y-100 translate-x-[25%] translate-y-[90%] sm:w-[500px]">
                <Image
                  src="/infinity.png"
                  alt=""
                  width={400}
                  height={400}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-medium text-brand-black lg:text-4xl">
                  Деятельность
                </h3>
                <p className="max-w-md text-base leading-relaxed text-neutral-600 lg:text-lg">
                  Мы развиваем четыре программы: помощь участникам СВО, детям, животным и старшим. 
                  И публикуем полную отчётность по каждому направлению.
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-8 lg:pt-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white sm:h-14 sm:w-14">
                  <IconUsers size={26} />
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}