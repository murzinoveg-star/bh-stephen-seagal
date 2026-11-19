import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/forms/DonationForm";
import OtherWaysSection from "@/components/sections/OtherWaysSection";
import BankDetailsSection from "@/components/sections/BankDetailsSection";

export const metadata: Metadata = {
  title: "Как помочь — БФ Стивена Сигала",
  description:
    "Поддержите программы благотворительного фонда Стивена Сигала: сделайте разовое или регулярное пожертвование, предложите профессиональную помощь или передайте необходимые вещи. Реквизиты фонда для банковского перевода.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

export default function DonatePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero: текст + форма */}
        <section className="relative bg-neutral-50 py-16">
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
                Как помочь
              </span>
            </nav>

            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Левая колонка: заголовок и описание */}
              <div className="lg:col-span-6">
                <h1 className="break-words text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
                  Поддержите программы фонда
                </h1>

                {/* Перенесенный блок про регулярные пожертвования */}
                <div className="mt-8 space-y-4 sm:mt-10">
                  <h2 className="text-xl font-semibold leading-snug text-brand-black sm:text-2xl">
                    Почему важны регулярные пожертвования?
                  </h2>
                  <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                    Ежемесячные пожертвования позволяют фонду заранее планировать
                    расходы на лечение, консультации специалистов, закупку
                    лекарств, продуктов, кормов и содержание приютов.
                  </p>
                  <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                    Вы самостоятельно выбираете сумму платежа и можете отменить
                    подписку в любой момент.
                  </p>
                </div>
              </div>

              {/* Правая колонка: форма в тёмной карточке */}
              <div className="lg:col-span-6">
                <div
                  className="rounded-3xl p-6 sm:p-8 lg:p-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
                  }}
                >
                  <DonationForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Другие способы помощи */}
        <OtherWaysSection />

        {/* Реквизиты для переводов */}
        <BankDetailsSection />
      </main>
      <Footer />
    </>
  );
}