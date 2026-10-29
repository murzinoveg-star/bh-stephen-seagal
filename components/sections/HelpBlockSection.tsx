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

    // TODO: заменить на реальный POST /api/help-request
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
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 disabled:opacity-50";

  const chipBase =
    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40 disabled:opacity-60";
  const chipIdle =
    "border-white/15 text-white/70 hover:border-white/30 hover:text-white";
  const chipActive = "border-brand-teal bg-brand-teal text-brand-black";

  return (
    <section className="relative overflow-hidden bg-brand-blue py-24 lg:py-32">
      {/* Фоновые элементы */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-brand-teal/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-brand-black/40 blur-[120px]"
      />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />

      {/* Декоративные «петли Мёбиуса» */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
      />
      <div
        aria-hidden="true"
        className="spin-slow pointer-events-none absolute -right-20 top-1/2 hidden h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-brand-teal/30 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Левая колонка: заголовок + текст */}
          <div className="lg:col-span-4 lg:self-start">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
              Нужна помощь?
            </h2>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/75 lg:text-xl">
              Если вы не знаете, с чего начать, посмотрите, кому и как помогает
              фонд. На странице «Мне нужна помощь» описаны направления, порядок
              обращения и контакты.
            </p>
          </div>

          {/* Правая колонка: форма */}
          <div className="lg:col-span-8">
            <div className="glass relative rounded-3xl p-7 lg:p-8">
              {submitted ? (
                // Success state
                <div className="flex flex-col items-start py-4" aria-live="polite">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium text-white">
                    Заявка отправлена
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                    Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней,
                    чтобы уточнить детали и подсказать дальнейшие шаги.
                  </p>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 text-sm font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot */}
                  <div
                    className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* 1. Имя и Телефон (в одну строку на sm+) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="help-name"
                        className="mb-2 block text-[13px] font-medium text-white/80"
                      >
                        Имя <span className="text-brand-teal">*</span>
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
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="help-phone"
                        className="mb-2 block text-[13px] font-medium text-white/80"
                      >
                        Телефон <span className="text-brand-teal">*</span>
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
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. Направление помощи (Дропдаун) */}
                  <div>
                    <label
                      htmlFor="help-direction"
                      className="mb-2 block text-[13px] font-medium text-white/80"
                    >
                      Направление помощи <span className="text-brand-teal">*</span>
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
                        className={`${inputBase} appearance-none cursor-pointer ${
                          direction === "" ? "text-white/30" : "text-white"
                        }`}
                      >
                        <option value="" disabled className="bg-brand-black text-white/50">
                          Выберите направление
                        </option>
                        {DIRECTIONS.map((d) => (
                          <option key={d.id} value={d.id} className="bg-brand-black text-white">
                            {d.label}
                          </option>
                        ))}
                      </select>
                      {/* Иконка стрелочки для селекта */}
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white/50"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.direction && (
                      <p className="mt-1.5 text-xs text-red-300">
                        {errors.direction}
                      </p>
                    )}
                  </div>

                  {/* Условный блок для СВО */}
                  {direction === "svo" && (
                    <div className="rounded-2xl border border-brand-teal/40 bg-brand-teal/15 p-4">
                      <div className="flex items-start gap-2.5 text-xs leading-relaxed text-white/90">
                        <svg
                          className="mt-0.5 shrink-0 text-brand-teal"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8h.01M11 12h1v4h1" />
                        </svg>
                        <span>
                          По направлению СВО фонд оказывает{" "}
                          <strong className="text-white">
                            только юридическую и психологическую
                          </strong>{" "}
                          помощь. Без спонсирования и покупки оборудования.
                        </span>
                      </div>

                      <div
                        className="mt-3 flex flex-wrap gap-2"
                        role="radiogroup"
                        aria-label="Какая помощь нужна"
                      >
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
                            className={`${chipBase} text-xs ${
                              svoHelp === h.id ? chipActive : chipIdle
                            }`}
                          >
                            {h.label}
                          </button>
                        ))}
                      </div>
                      {errors.svoHelp && (
                        <p className="mt-1.5 text-xs text-red-300">
                          {errors.svoHelp}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 3. Описание ситуации */}
                  <div>
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <label
                        htmlFor="help-message"
                        className="text-[13px] font-medium text-white/80"
                      >
                        Кратко опишите ситуацию{" "}
                        <span className="text-brand-teal">*</span>
                      </label>
                      <span className="text-[11px] tabular-nums text-white/40">
                        {message.length} / 2000
                      </span>
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
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-300">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* 4. Согласие */}
                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            setErrors((prev) => ({ ...prev, consent: "" }));
                          }}
                          disabled={submitting}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/30 bg-white/[0.06] transition-colors checked:border-brand-teal checked:bg-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
                        />
                        <svg
                          className="pointer-events-none absolute h-3 w-3 text-brand-black opacity-0 peer-checked:opacity-100"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <span className="text-xs leading-relaxed text-white/65">
                        Я согласен(-на) на обработку персональных данных в
                        соответствии с{" "}
                        <a
                          href="#"
                          className="text-brand-teal underline-offset-2 hover:underline"
                        >
                          политикой конфиденциальности
                        </a>
                        . Данные используются только для рассмотрения
                        обращения.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 pl-8 text-xs text-red-300">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* 5. Кнопка отправки */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-teal px-8 py-4 text-sm font-semibold tracking-wide text-brand-black shadow-lg shadow-brand-teal/25 transition-all duration-300 hover:bg-[#00d0ff] hover:shadow-brand-teal/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            opacity="0.25"
                          />
                          <path
                            d="M12 2a10 10 0 019.95 9"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Отправляем…
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}