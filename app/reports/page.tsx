import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportsArchiveSection from "@/components/sections/ReportsArchiveSection";

export const metadata: Metadata = {
  title: "Отчётность — БФ Стивена Сигала",
  description:
    "В этом разделе публикуется отчётность о деятельности благотворительного фонда Стивена Сигала: поступивших пожертвованиях, расходовании средств и результатах благотворительных программ.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

export default function ReportsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-neutral-50 py-16">

          <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
            <nav
              aria-label="Хлебные крошки"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs text-neutral-600"
            >
              <Link
                href="/"
                className="transition-colors hover:text-brand-black"
              >
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-brand-black">
                Отчётность
              </span>
            </nav>

            <h1 className="break-words text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Отчётность
            </h1>

            <div className="mt-6 max-w-3xl space-y-4 sm:mt-8">
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                В этом разделе будет публиковаться отчётность о деятельности
                Благотворительного фонда Стивена Сигала, поступивших
                пожертвованиях, расходовании средств и результатах
                благотворительных программ.
              </p>
              <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                На данный момент отчёты ещё не опубликованы. Документы будут
                размещаться по мере завершения отчётных периодов.
              </p>
            </div>
          </div>
        </section>
        
        {/* Архив отчётов */}
        <ReportsArchiveSection />
      </main>
      <Footer />
    </>
  );
}