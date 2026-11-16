import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactsSection from "@/components/sections/ContactsSection";

export const metadata: Metadata = {
  title: "Контакты — БФ Стивена Сигала",
  description:
    "Свяжитесь с благотворительным фондом Стивена Сигала: общие вопросы, запросы для СМИ и вопросы сотрудничества. Адрес: г. Москва, 1-й Колобовский переулок, д. 11. ПН-ПТ: 10:00-19:00.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-neutral-50 py-16">

          <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
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
                Контакты
              </span>
            </nav>

            <h1 className="break-words text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
              Контакты
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-800 sm:mt-6 sm:text-lg lg:text-xl">
              Свяжитесь с менеджерами по вопросам деятельности фонда,
              благотворительных пожертвований и сотрудничества.
            </p>
          </div>
        </section>

        {/* Секция контактов без дублирующего заголовка */}
        <ContactsSection showHeading={false} />
      </main>
      <Footer />
    </>
  );
}