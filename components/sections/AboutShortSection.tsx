import Image from "next/image";
import Link from "next/link";

export default function AboutShortSection() {
  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              Помощь,
              <br />
              которую можно понять
            </h2>

            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">
              БФ Стивена Сигала — благотворительный фонд, работающий в РФ. Наша
              задача — сделать помощь понятной: человеку должно быть ясно, куда
              обратиться, а донору — куда направляются средства. Мы развиваем
              четыре программы и публикуем отчётность.
            </p>

            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue sm:mt-8"
            >
              <span className="border-b border-brand-blue/30 pb-0.5 transition-colors group-hover:border-brand-blue">
                Подробнее о фонде
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end xl:col-span-4">
            {/* Изменено: w-48 h-48 на мобильных, w-64 на планшетах */}
            <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full sm:h-64 sm:w-64 lg:h-[340px] lg:w-[340px]">
              <Image
                src="/logo-symbol-blue.svg" 
                alt="Символ фонда"
                width={400}
                height={400}
                className="relative z-0 h-full w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full">
                <div className="animate-shine-loop h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}