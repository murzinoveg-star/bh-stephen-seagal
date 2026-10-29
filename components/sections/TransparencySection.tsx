// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import Button from "../ui/Button";

// // TODO: заменить демо-значения на данные из CMS после подтверждения.
// // В content.json значения помечены как "[цифра]", а 4-й показатель — как
// // "Добавить показатель по программам" (использован дефолт «Программ фонда»).
// const METRICS = [
//   { id: "collected", label: "Собрано средств",      value: 12_480_000, suffix: "₽", featured: true  },
//   { id: "requests",  label: "Поддержано обращений", value: 1_240,      suffix: "",  featured: false },
//   { id: "reports",   label: "Отчётов опубликовано", value: 18,         suffix: "",  featured: false },
//   { id: "programs",  label: "Программ фонда",       value: 4,          suffix: "",  featured: false },
// ];

// const nf = new Intl.NumberFormat("ru-RU");
// const fmt = (n: number) => nf.format(n).replace(/,/g, " ");

// function useCountUp(target: number, duration = 1800) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const [value, setValue] = useState(0);
//   const started = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const io = new IntersectionObserver(
//       (entries) => {
//         for (const entry of entries) {
//           if (entry.isIntersecting && !started.current) {
//             started.current = true;
//             const start = performance.now();
//             const tick = (now: number) => {
//               const t = Math.min((now - start) / duration, 1);
//               const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
//               setValue(Math.round(target * eased));
//               if (t < 1) requestAnimationFrame(tick);
//             };
//             requestAnimationFrame(tick);
//           }
//         }
//       },
//       { threshold: 0.4 }
//     );

//     io.observe(el);
//     return () => io.disconnect();
//   }, [target, duration]);

//   return { ref, value };
// }

// function MetricCard({
//   label,
//   value,
//   suffix,
//   featured = false,
// }: {
//   label: string;
//   value: number;
//   suffix: string;
//   featured?: boolean;
// }) {
//   const { ref, value: current } = useCountUp(value);
//   const finalLabel = `${label}: ${fmt(value)}${suffix ? ` ${suffix}` : ""} — смотреть отчёты`;

//   if (featured) {
//     return (
//       <Link
//         href="/reports"
//         aria-label={finalLabel}
//         className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/5 lg:p-10"
//       >
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//         />

//         <div className="flex items-baseline gap-2">
//           <span
//             ref={ref}
//             className="text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-brand-black transition-colors duration-300 group-hover:text-brand-blue"
//           >
//             {fmt(current)}
//           </span>
//           {suffix && (
//             <span className="text-xl font-medium text-brand-teal">{suffix}</span>
//           )}
//         </div>

//         <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
//           {label}
//         </span>
//       </Link>
//     );
//   }

//   return (
//     <Link
//       href="/reports"
//       aria-label={finalLabel}
//       className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/5"
//     >
//       <span
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//       />

//       <div className="flex items-baseline gap-1.5">
//         <span
//           ref={ref}
//           className="text-[clamp(2rem,3.5vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-brand-black transition-colors duration-300 group-hover:text-brand-blue"
//         >
//           {fmt(current)}
//         </span>
//         {suffix && (
//           <span className="text-base font-medium text-brand-teal">{suffix}</span>
//         )}
//       </div>

//       <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
//         {label}
//       </span>
//     </Link>
//   );
// }

// export default function TransparencySection() {
//   const [featured, ...rest] = METRICS;

//   return (
//     <section className="relative overflow-hidden bg-white py-24 lg:py-32">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-blue/5 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-brand-teal/5 blur-3xl"
//       />

//       <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
//         <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
//           {/* Левая колонка: заголовок + текст + CTA */}
//           <div className="lg:col-span-5 lg:pr-8">
//             <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
//               Прозрачность
//               <br />
//               и отчётность
//             </h2>

//             <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
//               Мы хотим, чтобы помощь была не только доброй, но и понятной. В
//               разделе отчётности публикуем документы, отчёты и пояснения по
//               поступлениям и расходам.
//             </p>

//             <div className="mt-10">
//               <Button href="/reports" variant="blue">
//                 Смотреть отчёты
//               </Button>
//             </div>
//           </div>

//           {/* Правая колонка: главная карточка + три под ней */}
//           <div className="flex flex-col gap-4 lg:col-span-7">
//             <MetricCard
//               label={featured.label}
//               value={featured.value}
//               suffix={featured.suffix}
//               featured
//             />

//             <div className="grid gap-4 sm:grid-cols-3">
//               {rest.map((m) => (
//                 <MetricCard
//                   key={m.id}
//                   label={m.label}
//                   value={m.value}
//                   suffix={m.suffix}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

// TODO: заменить демо-значения на данные из CMS после подтверждения.
const METRICS = [
  { id: "collected", label: "Собрано средств",      value: 12_480_000, suffix: "₽", featured: true  },
  { id: "requests",  label: "Поддержано обращений", value: 1_240,      suffix: "",  featured: false },
  { id: "reports",   label: "Отчётов опубликовано", value: 18,         suffix: "",  featured: false },
  { id: "programs",  label: "Программ фонда",       value: 4,          suffix: "",  featured: false },
];

const nf = new Intl.NumberFormat("ru-RU");
const fmt = (n: number) => nf.format(n).replace(/,/g, " ");

function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

function MetricCard({
  label,
  value,
  suffix,
  featured = false,
}: {
  label: string;
  value: number;
  suffix: string;
  featured?: boolean;
}) {
  const { ref, value: current } = useCountUp(value);
  const finalLabel = `${label}: ${fmt(value)}${suffix ? ` ${suffix}` : ""} — смотреть отчёты`;

  if (featured) {
    return (
      <Link
        href="/reports"
        aria-label={finalLabel}
        // Убрали overflow-hidden, чтобы животное могло "выглядывать" за края карточки
        className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/5 lg:p-10"
      >
        {/* Внутренний слой для обрезки декоративных элементов */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <span
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* Контейнер для будущего PNG животного */}
        <div className="pointer-events-none absolute -bottom-4 -right-2 z-10 hidden h-48 w-48 sm:block lg:h-64 lg:w-64">
          <Image
  src="/dog.png"
  alt=""
  width={400}
  height={400}
  className="object-contain object-bottom w-full h-full scale-110 origin-bottom-right"
/>
        </div>

        {/* Контент карточки */}
        <div className="relative z-20 flex items-baseline gap-2">
          <span
            ref={ref}
            className="text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-brand-black transition-colors duration-300 group-hover:text-brand-blue"
          >
            {fmt(current)}
          </span>
          {suffix && (
            <span className="text-xl font-medium text-brand-teal">{suffix}</span>
          )}
        </div>

        <span className="relative z-20 mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/reports"
      aria-label={finalLabel}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-baseline gap-1.5">
        <span
          ref={ref}
          className="text-[clamp(2rem,3.5vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.03em] text-brand-black transition-colors duration-300 group-hover:text-brand-blue"
        >
          {fmt(current)}
        </span>
        {suffix && (
          <span className="text-base font-medium text-brand-teal">{suffix}</span>
        )}
      </div>

      <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </span>
    </Link>
  );
}

export default function TransparencySection() {
  const [featured, ...rest] = METRICS;

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-blue/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-brand-teal/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Левая колонка: заголовок + текст + CTA */}
          <div className="lg:col-span-5 lg:pr-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              Прозрачность
              <br />
              и отчётность
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
              Мы хотим, чтобы помощь была не только доброй, но и понятной. В
              разделе отчётности публикуем документы, отчёты и пояснения по
              поступлениям и расходам.
            </p>

            <div className="mt-10">
              <Button href="/reports" variant="blue">
                Смотреть отчёты
              </Button>
            </div>
          </div>

          {/* Правая колонка: главная карточка + три под ней */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <MetricCard
              label={featured.label}
              value={featured.value}
              suffix={featured.suffix}
              featured
            />

            <div className="grid gap-4 sm:grid-cols-3">
              {rest.map((m) => (
                <MetricCard
                  key={m.id}
                  label={m.label}
                  value={m.value}
                  suffix={m.suffix}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}