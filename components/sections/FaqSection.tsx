"use client";

import { useState } from "react";

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

const FAQ_ITEMS = [
  {
    question: "Как я узнаю, на что пошло моё пожертвование?",
    answer: "Мы рассказываем о работе программ и публикуем отчётность фонда. Если вы выбрали конкретное направление помощи, средства будут направлены на связанные с ним задачи. Если вам нужна дополнительная информация о пожертвовании, вы сможете связаться с командой фонда по почте info@seagalfund.ru."
  },
  {
    question: "Можно ли помочь конкретному человеку, семье или животному?",
    answer: "Пока адресная помощь на сайте недоступна. Сейчас можно поддержать одно из направлений или работу фонда в целом. В будущем мы планируем открыть адресные сборы для конкретных людей, семей и животных и обязательно расскажем об этом на сайте."
  },
  {
    question: "Можно ли отменить регулярное пожертвование?",
    answer: "Да. Регулярную поддержку можно отменить в любое время. После оформления пожертвования вы получите информацию о том, как управлять подпиской. Если возникнут сложности с отключением, напишите на почту info@seagalfund.ru."
  },
  {
    question: "Можно ли стать волонтёром фонда?",
    answer: "Пока набор волонтёров не открыт. В будущем мы планируем развивать волонтёрские программы и центры, где каждый сможет присоединиться к работе фонда. О старте набора мы сообщим на сайте."
  },
  {
    question: "Какая сумма действительно поможет?",
    answer: "Любая. Для нас важен не размер отдельного пожертвования, а количество людей, которые готовы поддерживать работу фонда. Даже небольшая регулярная сумма помогает продолжать программы и планировать помощь заранее."
  },
  {
    question: "Что будет с пожертвованием, если в выбранном направлении помощь сейчас не требуется?",
    answer: "Если в выбранной программе уже достаточно средств, мы сохраним средства в этом направлении на следующие обращения."
  },
  {
    question: "Кто и как проверяет благополучателей?",
    answer: "Каждое обращение проверяет команда фонда. Мы изучаем документы и сведения, подтверждающие ситуацию и необходимость помощи, чтобы защитить пожертвования от мошенничества и направлять средства тем, кому поддержка действительно нужна."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-neutral-50 py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Левая колонка: Заголовок */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:pr-8">
            <div className="mb-6 flex items-center gap-1">
              <span className="flex items-center justify-center text-brand-blue">
                <IconIntersect size={20} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-black">
                Прозрачность и открытость
              </span>
            </div>

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              О чем нас
              <br />
              спрашивают
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 lg:text-lg">
              Собрали ответы на самые частые вопросы, которые помогают понять, как устроена работа фонда.
            </p>
          </div>

          {/* Правая колонка: Аккордеон */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-200 bg-white px-6 sm:px-8">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="border-b border-neutral-200 last:border-none">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left outline-none transition-colors hover:text-brand-blue focus-visible:text-brand-blue"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-medium leading-snug text-inherit sm:text-lg">
                        {item.question}
                      </span>
                      <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen ? "border-brand-blue bg-brand-blue text-white" : "border-neutral-300 text-neutral-500"
                      }`}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    {/* Плавное раскрытие с помощью grid-rows */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}