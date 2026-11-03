"use client";

import { useState } from "react";
import Image from "next/image";

const AMOUNTS = [300, 500, 1000, 3000];

export default function HelpBlockSection() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(300);
  const [customAmount, setCustomAmount] = useState("");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [consentPD, setConsentPD] = useState(false);
  const [consentOffer, setConsentOffer] = useState(false);
  const [takeCommission, setTakeCommission] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentAmount = customAmount ? Number(customAmount) : selectedAmount;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !consentPD || !consentOffer) return;

    setSubmitting(true);

    console.log("[donate/stub]", {
      isMonthly,
      amount: currentAmount,
      name,
      email,
      phone,
      consentPD,
      consentOffer,
      takeCommission,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setConsentPD(false);
    setConsentOffer(false);
    setSubmitted(false);
    setSelectedAmount(300);
    setCustomAmount("");
  }

  const inputBase =
    "w-full border-b border-white/30 bg-transparent px-0 py-2.5 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-white disabled:opacity-50";

  const chipBase =
    "rounded-xl border py-3 text-center text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60";
  const chipIdle =
    "border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white";
  const chipActive = "border-white bg-white text-brand-blue";

  return (
    <section className="relative bg-white px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      
      <div 
        className="relative mx-auto flex w-full max-w-[1920px] flex-col overflow-hidden rounded-[32px] lg:rounded-[48px]"
        style={{ backgroundImage: "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)" }}
      >

        {/* Картинка сердца в левом нижнем углу */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-[0px] -translate-x-[-15%] translate-y-[35%] sm:w-[500px]">
          <Image
            src="/heart_dark.png"
            alt=""
            width={500}
            height={500}
            className="h-auto w-full object-contain"
          />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-10 lg:py-16">
          
          {/* Сетка 6/6 */}
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
            
            {/* Левая колонка: Текст (6 колонок) */}
            <div className="lg:col-span-6 lg:pr-8">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Как помочь?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg lg:text-xl">
                Отправить пожертвование можно на любую удобную сумму по QR-коду или банковской картой.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
                Выберите разовый перевод или ежемесячное пожертвование. Постоянные поступления позволяют фонду оказывать стабильную регулярную поддержку.
              </p>
            </div>

            {/* Правая колонка: Форма (6 колонок) */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="flex flex-col items-start py-4" aria-live="polite">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white sm:h-16 sm:w-16">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:h-8 sm:w-8">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-medium text-white sm:mt-8 sm:text-3xl">Спасибо за поддержку!</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
                    Ваше пожертвование помогает нам продолжать работу и оказывать помощь тем, кто в ней нуждается.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 text-sm font-semibold text-white underline-offset-4 hover:underline sm:mt-10 sm:text-base"
                  >
                    Сделать ещё одно пожертвование
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                  
                  {/* Заголовок формы */}
                  <div>
                    <h3 className="text-2xl font-medium text-white sm:text-3xl">Помогите сейчас!</h3>
                    <p className="mt-1.5 text-sm text-white/70">Поддержите работу фонда удобным для вас способом.</p>
                  </div>

                  {/* Переключатель Разово / Ежемесячно */}
                  <div className="flex rounded-2xl bg-white/10 p-1.5 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => setIsMonthly(false)}
                      className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
                        !isMonthly ? "bg-white text-brand-black shadow-sm" : "text-white/70 hover:text-white"
                      }`}
                    >
                      Разово
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMonthly(true)}
                      className={`relative flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isMonthly ? "bg-white text-brand-black shadow-sm" : "text-white/70 hover:text-white"
                      }`}
                    >
                      Ежемесячно
                      <span className="absolute -right-2 -top-2 rounded-full bg-brand-teal px-2 py-0.5 text-[9px] uppercase tracking-wider text-white">
                        Эффект x12
                      </span>
                    </button>
                  </div>

                  {/* Сетка сумм */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`${chipBase} ${
                          selectedAmount === amt && !customAmount ? chipActive : chipIdle
                        }`}
                      >
                        {amt} ₽
                      </button>
                    ))}
                  </div>

                  {/* Своя сумма */}
                  <div>
                    <input
                      type="number"
                      placeholder="Другая сумма"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className={inputBase}
                    />
                  </div>

                  {/* Поля Имя, Почта, Телефон */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Чекбоксы */}
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={takeCommission}
                          onChange={(e) => setTakeCommission(e.target.checked)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        />
                        <svg className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/70">
                        Беру комиссию сервиса на себя <strong>+8 ₽</strong>
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={consentPD}
                          onChange={(e) => setConsentPD(e.target.checked)}
                          required
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        />
                        <svg className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/70">
                        Согласен(-на) на <a href="#" className="text-white underline underline-offset-2 hover:text-white/80">обработку персональных данных</a>
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={consentOffer}
                          onChange={(e) => setConsentOffer(e.target.checked)}
                          required
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        />
                        <svg className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/70">
                        Согласен(-на) с <a href="#" className="text-white underline underline-offset-2 hover:text-white/80">условиями оферты</a>
                      </span>
                    </label>
                  </div>

                  {/* Кнопка отправки */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-between gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d0ff] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <span className="flex w-full items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                            <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Отправляем…
                        </span>
                      ) : (
                        <>
                          <span>Помочь сейчас</span>
                          <span className="text-base font-bold">
                            {currentAmount ? `${currentAmount.toLocaleString("ru-RU")} ₽` : "Сумма"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}