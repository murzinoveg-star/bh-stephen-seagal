"use client";

import { useState, type FormEvent } from "react";

const DIRECTIONS = [
  { id: "svo", label: "Помощь участникам СВО" },
  { id: "children", label: "Помощь детям" },
  { id: "animals", label: "Помощь животным" },
  { id: "elderly", label: "Помощь старшим" },
] as const;

const SVO_HELP = [
  { id: "legal", label: "Юридическая" },
  { id: "psych", label: "Психологическая" },
  { id: "unsure", label: "Не знаю" },
] as const;

type DirectionId = (typeof DIRECTIONS)[number]["id"];
type SvoHelpId = (typeof SVO_HELP)[number]["id"];

export default function HelpBlockSection() {
  const [direction, setDirection] = useState<DirectionId | "">("");
  const [svoHelp, setSvoHelp] = useState<SvoHelpId | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) next.name = "Укажите имя";
    if (!phone.trim() || phone.trim().length < 5) next.phone = "Укажите телефон";
    if (!direction) next.direction = "Выберите направление";
    if (direction === "svo" && !svoHelp) next.svoHelp = "Уточните, какая помощь нужна";
    if (message.trim().length < 20) next.message = "Опишите ситуацию — минимум 20 символов";
    if (!consent) next.consent = "Нужно согласие на обработку данных";
    
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setSubmitting(true);

    console.log("[help-request/stub]", {
      name,
      phone,
      direction,
      svoHelp,
      message,
      consent,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  function reset() {
    setName("");
    setPhone("");
    setDirection("");
    setSvoHelp(null);
    setMessage("");
    setConsent(false);
    setErrors({});
    setSubmitted(false);
  }

  const inputBase =
    "w-full border-b border-white/30 bg-transparent px-0 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-white disabled:opacity-50";

  const chipBase =
    "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60 sm:px-5 sm:text-sm";
  const chipIdle =
    "border-white/30 text-white/70 hover:border-white hover:text-white";
  const chipActive = "border-white bg-white text-brand-blue";

  return (
    <section className="relative bg-white px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6">
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col overflow-hidden rounded-[32px] bg-brand-blue lg:rounded-[48px]">
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            
            <div className="lg:col-span-4">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Нужна помощь?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg lg:text-xl">
                Если вы не знаете, с чего начать, посмотрите, кому и как помогает
                фонд. На странице «Мне нужна помощь» описаны направления, порядок
                обращения и контакты.
              </p>
            </div>

            <div className="lg:col-span-8">
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
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 text-sm font-semibold text-white underline-offset-4 hover:underline sm:mt-10 sm:text-base"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10">
                  <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                    <input type="text" tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                    <div>
                      <label htmlFor="help-name" className="mb-2 block text-sm font-medium text-white/80">
                        Имя <span className="text-white">*</span>
                      </label>
                      <input
                        id="help-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        disabled={submitting}
                        placeholder="Как к вам обращаться"
                        className={inputBase}
                      />
                      {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="help-phone" className="mb-2 block text-sm font-medium text-white/80">
                        Телефон <span className="text-white">*</span>
                      </label>
                      <input
                        id="help-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        disabled={submitting}
                        placeholder="+7 (___) ___-__-__"
                        className={inputBase}
                      />
                      {errors.phone && <p className="mt-2 text-xs text-red-300">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="help-direction" className="mb-2 block text-sm font-medium text-white/80">
                      Направление помощи <span className="text-white">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="help-direction"
                        value={direction}
                        onChange={(e) => {
                          setDirection(e.target.value as DirectionId | "");
                          if (e.target.value !== "svo") setSvoHelp(null);
                          setErrors((prev) => ({ ...prev, direction: "", svoHelp: "" }));
                        }}
                        disabled={submitting}
                        className={`${inputBase} appearance-none cursor-pointer ${direction === "" ? "text-white/40" : "text-white"}`}
                      >
                        <option value="" disabled className="bg-brand-black text-white/50">Выберите направление</option>
                        {DIRECTIONS.map((d) => (
                          <option key={d.id} value={d.id} className="bg-brand-black text-white">{d.label}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.direction && <p className="mt-2 text-xs text-red-300">{errors.direction}</p>}
                  </div>

                  {direction === "svo" && (
                    <div className="border-l-2 border-white/40 pl-4 sm:pl-5">
                      <div className="flex items-start gap-3 text-xs leading-relaxed text-white/80 sm:text-sm">
                        <span>
                          По направлению СВО фонд оказывает <strong className="text-white">только юридическую и психологическую</strong> помощь. Без спонсирования и покупки оборудования.
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3" role="radiogroup" aria-label="Какая помощь нужна">
                        {SVO_HELP.map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            role="radio"
                            aria-checked={svoHelp === h.id}
                            onClick={() => {
                              setSvoHelp(h.id);
                              setErrors((prev) => ({ ...prev, svoHelp: "" }));
                            }}
                            disabled={submitting}
                            className={`${chipBase} ${svoHelp === h.id ? chipActive : chipIdle}`}
                          >
                            {h.label}
                          </button>
                        ))}
                      </div>
                      {errors.svoHelp && <p className="mt-2 text-xs text-red-300">{errors.svoHelp}</p>}
                    </div>
                  )}

                  <div>
                    <div className="mb-2 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <label htmlFor="help-message" className="text-sm font-medium text-white/80">
                        Кратко опишите ситуацию <span className="text-white">*</span>
                      </label>
                      <span className="text-xs tabular-nums text-white/40">{message.length} / 2000</span>
                    </div>
                    <textarea
                      id="help-message"
                      rows={4}
                      maxLength={2000}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setErrors((prev) => ({ ...prev, message: "" }));
                      }}
                      disabled={submitting}
                      placeholder="Что случилось и какая помощь нужна"
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 sm:gap-4">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            setErrors((prev) => ({ ...prev, consent: "" }));
                          }}
                          disabled={submitting}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:h-6 sm:w-6"
                        />
                        <svg className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/70 sm:text-sm">
                        Я согласен(-на) на обработку персональных данных в соответствии с{" "}
                        <a href="#" className="text-white underline underline-offset-2 hover:text-white/80">политикой конфиденциальности</a>. Данные используются только для рассмотрения обращения.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-2 pl-8 text-xs text-red-300 sm:pl-10">{errors.consent}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d0ff] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[240px] sm:px-8 sm:py-4"
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
                        <>
                          Отправить заявку
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
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