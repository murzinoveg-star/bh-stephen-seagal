"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = [
  { id: "svo", label: "Помощь участникам СВО" },
  { id: "children", label: "Помощь детям" },
  { id: "animals", label: "Помощь животным" },
  { id: "elderly", label: "Помощь старшим" },
];

// Иконка Info
function IconInfo({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export default function HelpRequestSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    category: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    
    setSubmitting(true);
    console.log("[help-request/stub]", formData);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  const inputBase =
    "w-full border-b border-white/30 bg-transparent px-0 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-white disabled:opacity-50";

  return (
    <section className="relative bg-brand-black py-16 sm:py-24 lg:py-32">
      
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg_dark.jpg"
          alt="Фон секции"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Шапка секции с разделителем */}
        <div className="mb-12 border-b border-white/10 pb-10 lg:mb-16 lg:pb-14">
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Нужна помощь?
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pb-2">
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                Заполните анкету и подробно расскажите о вашей ситуации. Так сотрудники фонда поймут, какая помощь необходима.
              </p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Левая колонка: Этапы, видео и пояснения */}
          <div className="lg:col-span-6 lg:pr-4">
            
            <div className="space-y-6 text-base leading-relaxed text-white/70 sm:text-lg">
              <p>
                После получения заявки специалисты изучат информацию и свяжутся с вами, если потребуется уточнить детали или запросить дополнительные документы.
              </p>
              <p>
                После рассмотрения обращения мы сообщим вам о принятом решении и дальнейших шагах.
              </p>
            </div>

            {/* Заглушка под видео Стивена */}
            <div className="mt-10 group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <button className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <span className="glass flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-teal group-hover:text-brand-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-white/60">Видео Стивена</span>
              </button>
            </div>

            {/* Пояснение по документам с иконкой (без подложки) */}
            <div className="mt-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-teal">
                <IconInfo size={26} />
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Документы нужны, чтобы подтвердить информацию в заявке, понять, какая помощь необходима, и принять решение по обращению. Фонду важно документально подтверждать основания для оказания помощи и использования благотворительных средств — это часть обязательного учёта.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Все документы и персональные данные используются только для рассмотрения заявки и организации помощи. Доступ к ним есть только у сотрудников фонда, которые работают с обращениями.
              </p>
            </div>
          </div>

          {/* Правая колонка: Форма */}
          <div className="lg:col-span-6">
            <div className="rounded-[32px] bg-brand-black/40 p-6 backdrop-blur-md sm:p-8 lg:p-10 border border-white/10">
              {submitted ? (
                <div className="flex flex-col items-start py-4" aria-live="polite">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white sm:h-16 sm:w-16">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:h-8 sm:w-8">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-medium text-white sm:mt-8 sm:text-3xl">Заявка отправлена</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
                    Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней, чтобы уточнить детали и подсказать дальнейшие шаги.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
                  
                  {/* Поля формы (сетка 2x2) */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-white/80">
                        ФИО <span className="text-white">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Иванов Иван Иванович"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={submitting}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium text-white/80">
                        Номер телефона <span className="text-white">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={submitting}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-white/80">
                        E-mail <span className="text-white">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={submitting}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="mb-1 block text-sm font-medium text-white/80">
                        Город <span className="text-white">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        placeholder="Ваш город"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        disabled={submitting}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="mb-1 block text-sm font-medium text-white/80">
                        Категория <span className="text-white">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          disabled={submitting}
                          className={`${inputBase} appearance-none cursor-pointer ${formData.category === "" ? "text-white/40" : "text-white"}`}
                        >
                          <option value="" disabled className="bg-brand-black text-white/50">Выберите категорию</option>
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id} className="bg-brand-black text-white">
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Текстовое поле ситуации */}
                  <div>
                    <div className="mb-1 flex items-baseline justify-between gap-3">
                      <label htmlFor="message" className="text-sm font-medium text-white/80">
                        Расскажите о вашей ситуации <span className="text-white">*</span>
                      </label>
                      <span className="text-[11px] tabular-nums text-white/40">{formData.message.length} / 2000</span>
                    </div>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      maxLength={2000}
                      placeholder="Подробно опишите, что случилось и какая помощь нужна..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={submitting}
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  {/* Кнопка прикрепить документы */}
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      Прикрепить документы
                    </button>
                  </div>

                  {/* Блок с документами (без подложки) */}
                  <div>
                    <h4 className="text-sm font-semibold text-white/90">Документы, необходимые для рассмотрения:</h4>
                    <ul className="mt-3 space-y-2 text-sm text-white/60">
                      <li className="flex gap-2"><span className="text-brand-teal">•</span> Паспорт или свидетельство о рождении.</li>
                      <li className="flex gap-2"><span className="text-brand-teal">•</span> СНИЛС/ИНН.</li>
                      <li className="flex gap-2"><span className="text-brand-teal">•</span> Документы, подтверждающие ситуацию: медицинские заключения, выписки из истории болезни, справка об инвалидности, направления на лечение, счёт клиники, рецептурные бланки.</li>
                      <li className="flex gap-2"><span className="text-brand-teal">•</span> Если обращение касается животного: фотографии и, при наличии, ветеринарные заключения или счета.</li>
                    </ul>
                  </div>

                  {/* Согласие и кнопка отправки */}
                  <div className="space-y-5">
                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        />
                        <svg className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/70">
                        Я согласен(-на) на обработку персональных данных в соответствии с{" "}
                        <a href="#" className="text-white underline underline-offset-2 hover:text-white/80">политикой конфиденциальности</a>.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting || !consent}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold tracking-wide text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d0ff] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                            <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Отправляем…
                        </>
                      ) : (
                        "Отправить заявку"
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