"use client";

import { useEffect, useRef, useState } from "react";

const AMOUNTS = [300, 500, 1000, 3000];

export interface SuccessContent {
  title: string;
  description: string;
}

export interface DonationFormProps {
  /** Список направлений для выбора в форме. Если не передан — селектора нет. */
  programs?: Array<{ id: string; label: string }>;
  /** ID направления по умолчанию. Должен присутствовать в programs. */
  defaultProgramId?: string;
  /** Уникальные сообщения об успехе для конкретных направлений (по id). */
  successByProgramId?: Record<string, SuccessContent>;
  /** Фолбэк, если для выбранного направления нет уникального сообщения. */
  defaultSuccess?: SuccessContent;
}

const DEFAULT_SUCCESS: SuccessContent = {
  title: "Спасибо за поддержку!",
  description:
    "Ваше пожертвование помогает нам продолжать работу и оказывать помощь тем, кто в ней нуждается.",
};

export default function DonationForm({
  programs,
  defaultProgramId,
  successByProgramId,
  defaultSuccess,
}: DonationFormProps = {}) {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(300);
  const [customAmount, setCustomAmount] = useState("");
  const [programId, setProgramId] = useState<string>(
    defaultProgramId ?? programs?.[0]?.id ?? "",
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [consentPD, setConsentPD] = useState(false);
  const [consentOffer, setConsentOffer] = useState(false);
  const [takeCommission, setTakeCommission] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  // P2.1: Защита от NaN.
  const currentAmount = (() => {
    if (customAmount) {
      const num = Number(customAmount);
      return Number.isFinite(num) && num > 0 ? num : null;
    }
    return selectedAmount;
  })();

  const successContent =
    (programs?.length && successByProgramId?.[programId]) ||
    defaultSuccess ||
    DEFAULT_SUCCESS;

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};

    if (!name.trim()) e.name = "Укажите имя";

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Проверьте формат email";
    }

    if (phone.trim()) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10) e.phone = "Проверьте формат телефона";
    }

    if (!consentPD) e.consentPD = "Необходимо согласие на обработку данных";
    if (!consentOffer) e.consentOffer = "Необходимо согласие с офертой";

    return e;
  }

  function handleFieldChange(
    field: string,
    setter: (v: string) => void,
    value: string,
  ) {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleCheckboxChange(
    field: string,
    setter: (v: boolean) => void,
    value: boolean,
  ) {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentAmount) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    console.log("[donate/stub]", {
      isMonthly,
      amount: currentAmount,
      programId: programs?.length ? programId : undefined,
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
    setTakeCommission(false);
    setIsMonthly(false);
    setSubmitting(false);
    setSubmitted(false);
    setErrors({});
    setSelectedAmount(300);
    setCustomAmount("");
    setProgramId(defaultProgramId ?? programs?.[0]?.id ?? "");
  }

  const inputBase =
    "w-full border-b bg-transparent px-0 py-2.5 text-base text-white placeholder:text-white/50 outline-none transition-colors disabled:opacity-50";

  function fieldClass(field: string) {
    return errors[field]
      ? "border-red-400/70 focus:border-red-400"
      : "border-white/30 focus:border-white";
  }

  const chipBase =
    "rounded-xl border py-3 text-center text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60";
  const chipIdle =
    "border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white";
  const chipActive = "border-white bg-white text-brand-blue";

  const showProgramSelect = !!programs && programs.length > 0;

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start py-4 focus:outline-none"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white sm:h-16 sm:w-16">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="sm:h-8 sm:w-8"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-medium text-white sm:mt-8 sm:text-3xl">
          {successContent.title}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
          {successContent.description}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:mt-10"
        >
          Сделать ещё одно пожертвование
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 sm:gap-6"
    >
      {/* Заголовок формы */}
      <div>
        <h3 className="text-2xl font-medium text-white sm:text-3xl">
          Помогите сейчас!
        </h3>
        <p className="mt-1.5 text-sm text-white/70">
          Поддержите работу фонда удобным для вас способом.
        </p>
      </div>

      {/* Переключатель Разово / Ежемесячно */}
      <div className="flex rounded-2xl bg-white/10 p-1.5 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setIsMonthly(false)}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            !isMonthly
              ? "bg-white text-brand-black shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
        >
          Разово
        </button>
        <button
          type="button"
          onClick={() => setIsMonthly(true)}
          className={`relative flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            isMonthly
              ? "bg-white text-brand-black shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
        >
          Ежемесячно
          <span className="absolute -right-2 -top-2 rounded-full bg-brand-teal px-2 py-0.5 text-[10px] uppercase tracking-wider text-white">
            Эффект x12
          </span>
        </button>
      </div>

      {/* Выбор направления — только если передан programs */}
      {showProgramSelect && (
        <div>
          <label
            htmlFor="donate-program"
            className="mb-1 block text-sm font-medium text-white/90"
          >
            Направление
          </label>
          <div className="relative">
            <select
              id="donate-program"
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              disabled={submitting}
              className={`${inputBase} ${fieldClass("programId")} appearance-none cursor-pointer pr-8`}
            >
              {programs!.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-brand-black text-white"
                >
                  {p.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/50"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      )}

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
          className={`${inputBase} ${fieldClass("customAmount")}`}
        />
      </div>

      {/* Поля Имя, Почта, Телефон */}
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="donate-name"
            className="mb-1 block text-sm font-medium text-white/90"
          >
            Имя <span className="text-white">*</span>
          </label>
          <input
            id="donate-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Иван"
            value={name}
            onChange={(e) =>
              handleFieldChange("name", setName, e.target.value)
            }
            disabled={submitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputBase} ${fieldClass("name")}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="donate-email"
            className="mb-1 block text-sm font-medium text-white/90"
          >
            Электронная почта
          </label>
          <input
            id="donate-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              handleFieldChange("email", setEmail, e.target.value)
            }
            disabled={submitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputBase} ${fieldClass("email")}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="donate-phone"
            className="mb-1 block text-sm font-medium text-white/90"
          >
            Телефон
          </label>
          <input
            id="donate-phone"
            type="tel"
            name="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) =>
              handleFieldChange("phone", setPhone, e.target.value)
            }
            disabled={submitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${inputBase} ${fieldClass("phone")}`}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={takeCommission}
              onChange={(e) =>
                handleCheckboxChange(
                  "takeCommission",
                  setTakeCommission,
                  e.target.checked,
                )
              }
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/40 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            />
            <svg
              className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100"
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
          <span className="text-xs leading-relaxed text-white/70">
            Беру комиссию сервиса на себя <strong>+8 ₽</strong>
          </span>
        </label>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={consentPD}
                onChange={(e) =>
                  handleCheckboxChange(
                    "consentPD",
                    setConsentPD,
                    e.target.checked,
                  )
                }
                aria-invalid={!!errors.consentPD}
                aria-describedby={
                  errors.consentPD ? "consentPD-error" : undefined
                }
                className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  errors.consentPD ? "border-red-400/70" : "border-white/40"
                }`}
              />
              <svg
                className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100"
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
            <span className="text-xs leading-relaxed text-white/70">
              Согласен(-на) на{" "}
              <a
                href="#"
                className="text-white underline underline-offset-2 hover:text-white/80"
              >
                обработку персональных данных
              </a>
            </span>
          </label>
          {errors.consentPD && (
            <p id="consentPD-error" className="mt-2 text-xs text-red-400">
              {errors.consentPD}
            </p>
          )}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={consentOffer}
                onChange={(e) =>
                  handleCheckboxChange(
                    "consentOffer",
                    setConsentOffer,
                    e.target.checked,
                  )
                }
                aria-invalid={!!errors.consentOffer}
                aria-describedby={
                  errors.consentOffer ? "consentOffer-error" : undefined
                }
                className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  errors.consentOffer ? "border-red-400/70" : "border-white/40"
                }`}
              />
              <svg
                className="pointer-events-none absolute h-3 w-3 text-brand-blue opacity-0 peer-checked:opacity-100"
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
            <span className="text-xs leading-relaxed text-white/70">
              Согласен(-на) с{" "}
              <a
                href="#"
                className="text-white underline underline-offset-2 hover:text-white/80"
              >
                условиями оферты
              </a>
            </span>
          </label>
          {errors.consentOffer && (
            <p id="consentOffer-error" className="mt-2 text-xs text-red-400">
              {errors.consentOffer}
            </p>
          )}
        </div>
      </div>

      {/* Кнопка отправки */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting || !currentAmount}
          className="inline-flex w-full items-center justify-between gap-6 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d0ff] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <span className="flex w-full items-center justify-center gap-2">
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
            </span>
          ) : (
            <>
              <span>Помочь сейчас</span>
              <span className="text-base font-bold">
                {currentAmount
                  ? `${currentAmount.toLocaleString("ru-RU")} ₽`
                  : "Сумма"}
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}