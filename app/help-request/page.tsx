import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpRequestSection from "@/components/sections/HelpRequestSection";
import FaqSection from "@/components/sections/FaqSection";
import type { FaqItem } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Мне нужна помощь — БФ Стивена Сигала",
  description:
    "Все обращения за помощью принимаются через анкету на сайте фонда. Заполните все поля и подробно опишите ситуацию — чем полнее информация, тем быстрее сотрудники фонда смогут рассмотреть заявку и принять решение.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
  },
};

const REQUEST_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Зачем необходимо прикреплять документы?",
    answer:
      "Документы помогают подтвердить информацию в заявке, определить необходимый вид поддержки и принять решение об оказании помощи. Они также необходимы для учёта и обоснования использования благотворительных средств.",
  },
  {
    question: "Насколько безопасно передавать персональные данные?",
    answer:
      "Предоставленные документы и персональные данные нужны для рассмотрения обращения и организации помощи. Доступ к ним имеют только сотрудники фонда, работающие с заявками. Обработка данных осуществляется в соответствии с Политикой обработки персональных данных.",
  },
  {
    question: "Как скоро я получу ответ на заявку?",
    answer:
      "Срок рассмотрения зависит от сложности обращения и полноты предоставленной информации. Если потребуются дополнительные сведения и документы, сотрудник фонда свяжется с вами. После проверки заявки решение будет направлено на электронную почту, указанную вами в анкете.",
  },
];

export default function HelpRequestPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — светлый, как и вся страница до футера */}
        <section className="relative bg-neutral-50 py-16">
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
              <span aria-hidden="true" className="text-neutral-400">
                /
              </span>
              <span aria-current="page" className="text-brand-black">
                Мне нужна помощь
              </span>
            </nav>

            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h1 className="break-words text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-brand-black">
                  Мне нужна помощь
                </h1>
              </div>

              <div className="lg:col-span-7">
                <p className="text-base leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                  Все обращения за помощью принимаются через анкету на сайте
                  фонда. Пожалуйста, заполните все поля и подробно опишите свою
                  ситуацию в соответствующем разделе. Расскажите о заболевании,
                  жизненных обстоятельствах человека, которому требуется
                  поддержка, или о состоянии животного, нуждающегося в помощи.
                  Чем полнее информация, тем быстрее сотрудники фонда смогут
                  рассмотреть заявку и принять решение.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Форма заявки — светлая, без декора */}
        <HelpRequestSection
          showHeading={false}
          showDecor={false}
          theme="light"
        />

        {/* FAQ с вопросами по заявкам */}
        <FaqSection items={REQUEST_FAQ_ITEMS} showDecor={false} />
      </main>
      <Footer />
    </>
  );
}