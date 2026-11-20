"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CATEGORIES = [
  { id: "svo", label: "Помощь участникам СВО" },
  { id: "children", label: "Помощь детям" },
  { id: "animals", label: "Помощь животным" },
  { id: "elderly", label: "Помощь пожилым людям" },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function IconInfo({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
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

function IconFile({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function IconX({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
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
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

interface HelpRequestSectionProps {
  /**
   * Показывать ли шапку секции (H2 «Нужна помощь?» + вводный абзац).
   * На главной и /programs — да, на отдельной странице /help-request — нет.
   */
  showHeading?: boolean;
  /**
   * Показывать ли декоративное фоновое изображение (heart_black.png).
   * На тёмной секции — да, на светлой версии — нет.
   */
  showDecor?: boolean;
  /**
   * Тема секции. "dark" — тёмный градиент (главная, /programs),
   * "light" — bg-neutral-50 (страница /help-request).
   */
  theme?: "dark" | "light";
}

export default function HelpRequestSection({
  showHeading = true,
  showDecor = true,
  theme = "dark",
}: HelpRequestSectionProps = {}) {
  const isLight = theme === "light";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    category: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Укажите ФИО";

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) e.phone = "Укажите номер телефона";
    else if (phoneDigits.length < 10) e.phone = "Проверьте формат телефона";

    if (!formData.email.trim()) e.email = "Укажите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      e.email = "Проверьте формат email";

    if (!formData.city.trim()) e.city = "Укажите город";
    if (!formData.category) e.category = "Выберите категорию";

    if (!formData.message.trim()) e.message = "Опишите ситуацию";
    else if (formData.message.trim().length < 20)
      e.message = "Опишите подробнее (минимум 20 символов)";

    if (!consent) e.consent = "Необходимо согласие на обработку данных";

    return e;
  }

  function handleFieldChange(field: keyof typeof formData, value: string) {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFileError(null);

    const combined = [...files, ...selected];
    const oversized = combined.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setFileError(`Файл «${oversized.name}» больше 10 МБ`);
    }
    const valid = combined
      .filter((f) => f.size <= MAX_FILE_SIZE)
      .slice(0, MAX_FILES);
    if (combined.length > MAX_FILES) {
      setFileError(`Можно прикрепить не более ${MAX_FILES} файлов`);
    }
    setFiles(valid);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError(null);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    console.log("[help-request/stub]", {
      ...formData,
      files: files.map((f) => f.name),
      consent,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  // ─── Стили, зависящие от темы ──────────────────────────────────────────

  const sectionBg = isLight
    ? "bg-neutral-50"
    : "bg-gradient-to-l from-[#121C26] to-[#1a2a3c]";

  const headingText = isLight ? "text-brand-black" : "text-white";
  const headingDesc = isLight ? "text-neutral-600" : "text-white/70";
  const headingBorder = isLight ? "border-neutral-200" : "border-white/10";
  const bodyText = isLight ? "text-neutral-600" : "text-white/70";
  const bodyTextSecondary = isLight ? "text-neutral-500" : "text-white/60";
  const bodyTextTertiary = isLight ? "text-neutral-400" : "text-white/50";
  const labelText = isLight ? "text-brand-black" : "text-white/90";
  const errorText = isLight ? "text-red-600" : "text-red-400";

  const inputBase = isLight
    ? "w-full border-b bg-transparent px-0 py-3 text-base text-brand-black placeholder:text-neutral-400 outline-none transition-colors disabled:opacity-50"
    : "w-full border-b bg-transparent px-0 py-3 text-base text-white placeholder:text-white/50 outline-none transition-colors disabled:opacity-50";

  function fieldClass(field: string, extra = "") {
    const border = errors[field]
      ? isLight
        ? "border-red-500 focus:border-red-500"
        : "border-red-400/70 focus:border-red-400"
      : isLight
        ? "border-neutral-300 focus:border-brand-blue"
        : "border-white/30 focus:border-white";
    return `${inputBase} ${border} ${extra}`;
  }

  const fileButtonStyles = isLight
    ? "border-neutral-300 bg-neutral-100 text-brand-black hover:border-brand-blue hover:bg-neutral-200"
    : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10";

  const fileListItemStyles = isLight
    ? "border-neutral-200 bg-neutral-100"
    : "border-white/10 bg-white/5";

  const fileRemoveStyles = isLight
    ? "text-neutral-500 hover:bg-neutral-200 hover:text-brand-black"
    : "text-white/50 hover:bg-white/10 hover:text-white";

  const videoBoxStyles = isLight
    ? "border-neutral-200 bg-neutral-100"
    : "border-white/10 bg-white/5";

  const videoPlayStyles = isLight
    ? "bg-white text-brand-blue shadow-md group-hover:bg-brand-teal group-hover:text-white"
    : "glass text-white group-hover:bg-brand-teal group-hover:text-brand-black";

  const videoCaptionStyles = isLight ? "text-neutral-500" : "text-white/60";

  const infoBadgeStyles = isLight
    ? "bg-neutral-100 text-brand-teal"
    : "bg-white/10 text-brand-teal";

  const submitStyles = isLight
    ? "bg-brand-blue text-white hover:bg-brand-teal"
    : "bg-white text-brand-black hover:bg-[#00d0ff]";

  const selectOptionStyles = isLight
    ? "bg-white text-brand-black"
    : "bg-brand-black text-white";

  const selectPlaceholderOptionStyles = isLight
    ? "bg-white text-neutral-400"
    : "bg-brand-black text-white/50";

  const successCircleBorder = isLight
    ? "border-neutral-300"
    : "border-white/30";
  const successCircleIcon = isLight ? "text-green-600" : "text-white";
  const successTitle = isLight ? "text-brand-black" : "text-white";
  const successDesc = isLight ? "text-neutral-600" : "text-white/70";

  const checkboxStyles = isLight
    ? "border-neutral-300 checked:border-brand-blue checked:bg-brand-blue"
    : "border-white/40 checked:border-white checked:bg-white";

  const checkboxErrorBorder = isLight ? "border-red-500" : "border-red-400/70";

  const checkboxIconStyles = isLight ? "text-white" : "text-brand-blue";

  const consentTextStyles = isLight ? "text-neutral-600" : "text-white/70";
  const consentLinkStyles = isLight
    ? "text-brand-blue hover:text-brand-teal"
    : "text-white hover:text-white/80";

  return (
    <section
      className={`relative overflow-hidden ${sectionBg} py-16 sm:py-16 lg:py-16`}
    >
      {/* Контент */}
      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Фоновое изображение — только если showDecor */}
        {showDecor && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[800px] -translate-x-[25%] translate-y-[55%] lg:block -scale-y-[100%]">
            <Image
              src="/heart_black.png"
              alt=""
              width={800}
              height={800}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {/* Шапка секции — только если showHeading */}
        {showHeading && (
          <div
            className={`mb-12 border-b ${headingBorder} pb-10 lg:mb-16 lg:pb-14`}
          >
            <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-24">
              <div className="lg:col-span-6">
                <h2
                  className={`text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] ${headingText}`}
                >
                  Нужна помощь?
                </h2>
              </div>
              <div className="lg:col-span-6 lg:pb-2">
                <p
                  className={`text-base leading-relaxed ${headingDesc} sm:text-lg`}
                >
                  Заполните анкету и подробно расскажите о вашей ситуации. Так
                  сотрудники фонда поймут, какая помощь необходима.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-24">
          {/* Левая колонка: Этапы, видео и пояснения */}
          <div className="lg:col-span-6">
            <div
              className={`space-y-6 text-base leading-relaxed ${bodyText} sm:text-lg`}
            >
              <p>
                После получения заявки специалисты изучат информацию и свяжутся
                с вами, если потребуется уточнить детали или запросить
                дополнительные документы.
              </p>
              <p>
                После рассмотрения обращения мы сообщим вам о принятом решении и
                дальнейших шагах.
              </p>
            </div>

            {/* Заглушка под видео Стивена — скрыта (добавлен класс hidden) */}
            <div
              className={`hidden group relative mt-10 aspect-video overflow-hidden rounded-3xl border ${videoBoxStyles}`}
            >
              <button className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105 ${videoPlayStyles}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="translate-x-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className={`text-sm font-medium ${videoCaptionStyles}`}>
                  Видео Стивена
                </span>
              </button>
            </div>

            {/* Пояснение по документам */}
            <div className="mt-10">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${infoBadgeStyles}`}
              >
                <IconInfo size={24} />
              </div>
              <p className={`text-sm leading-relaxed ${bodyTextSecondary}`}>
                Документы нужны, чтобы подтвердить информацию в заявке, понять,
                какая помощь необходима, и принять решение по обращению. Фонду
                важно документально подтверждать основания для оказания помощи и
                использования благотворительных средств — это часть
                обязательного учёта.
              </p>
              <p className={`mt-3 text-xs leading-relaxed ${bodyTextTertiary}`}>
                Все документы и персональные данные используются только для
                рассмотрения заявки и организации помощи. Доступ к ним есть
                только у сотрудников фонда, которые работают с обращениями.
              </p>
            </div>
          </div>

          {/* Правая колонка: Форма */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="flex flex-col items-start py-4 focus:outline-none"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border ${successCircleBorder} ${successCircleIcon} sm:h-16 sm:w-16`}
                >
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
                <h3
                  className={`mt-6 text-2xl font-medium ${successTitle} sm:mt-8 sm:text-3xl`}
                >
                  Заявка отправлена
                </h3>
                <p
                  className={`mt-3 max-w-md text-base leading-relaxed ${successDesc} sm:mt-4 sm:text-lg`}
                >
                  Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней, чтобы
                  уточнить детали и подсказать дальнейшие шаги.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6 sm:gap-8"
              >
                {/* Поля формы (сетка 2x2) */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className={`mb-1 block text-sm font-medium ${labelText}`}
                    >
                      ФИО <span className={labelText}>*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Иванов Иван Иванович"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleFieldChange("fullName", e.target.value)
                      }
                      disabled={submitting}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                      className={fieldClass("fullName")}
                    />
                    {errors.fullName && (
                      <p
                        id="fullName-error"
                        className={`mt-1.5 text-xs ${errorText}`}
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className={`mb-1 block text-sm font-medium ${labelText}`}
                    >
                      Номер телефона <span className={labelText}>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                      disabled={submitting}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      className={fieldClass("phone")}
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className={`mt-1.5 text-xs ${errorText}`}
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`mb-1 block text-sm font-medium ${labelText}`}
                    >
                      Электронная почта <span className={labelText}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      disabled={submitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={fieldClass("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className={`mt-1.5 text-xs ${errorText}`}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className={`mb-1 block text-sm font-medium ${labelText}`}
                    >
                      Город <span className={labelText}>*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="address-level2"
                      autoComplete="address-level2"
                      required
                      placeholder="Ваш город"
                      value={formData.city}
                      onChange={(e) =>
                        handleFieldChange("city", e.target.value)
                      }
                      disabled={submitting}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      className={fieldClass("city")}
                    />
                    {errors.city && (
                      <p
                        id="city-error"
                        className={`mt-1.5 text-xs ${errorText}`}
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className={`mb-1 block text-sm font-medium ${labelText}`}
                    >
                      Категория <span className={labelText}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={(e) =>
                          handleFieldChange("category", e.target.value)
                        }
                        disabled={submitting}
                        aria-invalid={!!errors.category}
                        aria-describedby={
                          errors.category ? "category-error" : undefined
                        }
                        className={`${fieldClass("category")} appearance-none cursor-pointer ${
                          formData.category === ""
                            ? isLight
                              ? "text-neutral-400"
                              : "text-white/50"
                            : isLight
                              ? "text-brand-black"
                              : "text-white"
                        }`}
                      >
                        <option
                          value=""
                          disabled
                          className={selectPlaceholderOptionStyles}
                        >
                          Выберите категорию
                        </option>
                        {CATEGORIES.map((c) => (
                          <option
                            key={c.id}
                            value={c.id}
                            className={selectOptionStyles}
                          >
                            {c.label}
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
                          className={
                            isLight ? "text-neutral-400" : "text-white/50"
                          }
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.category && (
                      <p
                        id="category-error"
                        className={`mt-1.5 text-xs ${errorText}`}
                      >
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Текстовое поле ситуации */}
                <div>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <label
                      htmlFor="message"
                      className={`text-sm font-medium ${labelText}`}
                    >
                      Расскажите о вашей ситуации{" "}
                      <span className={labelText}>*</span>
                    </label>
                    <span
                      className={`text-xs tabular-nums ${bodyTextTertiary}`}
                    >
                      {formData.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Подробно опишите, что случилось и какая помощь нужна..."
                    value={formData.message}
                    onChange={(e) =>
                      handleFieldChange("message", e.target.value)
                    }
                    disabled={submitting}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${fieldClass("message")} resize-none`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className={`mt-1.5 text-xs ${errorText}`}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Скрытый input + кнопка прикрепления документов */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFilesChange}
                    className="hidden"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={submitting || files.length >= MAX_FILES}
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${fileButtonStyles}`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    {files.length === 0
                      ? "Прикрепить документы"
                      : "Добавить ещё файл"}
                  </button>

                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${fileListItemStyles}`}
                        >
                          <span className="shrink-0 text-brand-teal">
                            <IconFile size={16} />
                          </span>
                          <span
                            className={`min-w-0 flex-1 truncate text-sm ${
                              isLight ? "text-brand-black" : "text-white/90"
                            }`}
                          >
                            {file.name}
                          </span>
                          <span
                            className={`shrink-0 text-xs tabular-nums ${bodyTextTertiary}`}
                          >
                            {formatSize(file.size)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            disabled={submitting}
                            aria-label={`Удалить файл ${file.name}`}
                            className={`shrink-0 rounded-md p-1 transition-colors disabled:opacity-50 ${fileRemoveStyles}`}
                          >
                            <IconX size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {fileError && (
                    <p className={`mt-2 text-xs ${errorText}`}>{fileError}</p>
                  )}
                  <p className={`mt-2 text-xs ${bodyTextTertiary}`}>
                    До {MAX_FILES} файлов, до 10 МБ каждый. PDF, JPG, PNG.
                  </p>
                </div>

                {/* Блок с документами */}
                <div>
                  <h4 className={`text-sm font-semibold ${labelText}`}>
                    Документы, необходимые для рассмотрения:
                  </h4>
                  <ul className={`mt-3 space-y-2 text-sm ${bodyTextSecondary}`}>
                    <li className="flex gap-2">
                      <span className="text-brand-teal">•</span> Паспорт или
                      свидетельство о рождении.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-teal">•</span> СНИЛС/ИНН.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-teal">•</span> Документы,
                      подтверждающие ситуацию: медицинские заключения, выписки
                      из истории болезни, справка об инвалидности, направления
                      на лечение, счёт клиники, рецептурные бланки.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-teal">•</span> Если обращение
                      касается животного: фотографии и, при наличии,
                      ветеринарные заключения или счета.
                    </li>
                  </ul>
                </div>

                {/* Согласие и кнопка отправки */}
                <div className="space-y-5">
                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (errors.consent) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.consent;
                                return next;
                              });
                            }
                          }}
                          required
                          aria-invalid={!!errors.consent}
                          aria-describedby={
                            errors.consent ? "consent-error" : undefined
                          }
                          className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                            isLight
                              ? "focus-visible:ring-brand-blue/40"
                              : "focus-visible:ring-white/40"
                          } ${
                            errors.consent
                              ? checkboxErrorBorder
                              : checkboxStyles
                          }`}
                        />
                        <svg
                          className={`pointer-events-none absolute h-3 w-3 ${checkboxIconStyles} opacity-0 peer-checked:opacity-100`}
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
                      <span
                        className={`text-xs leading-relaxed ${consentTextStyles}`}
                      >
                        Я согласен(-на) на обработку персональных данных в
                        соответствии с{" "}
                        <a
                          href="#"
                          className={`underline underline-offset-2 ${consentLinkStyles}`}
                        >
                          политикой конфиденциальности
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p
                        id="consent-error"
                        className={`mt-2 text-xs ${errorText}`}
                      >
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${submitStyles}`}
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
                      "Отправить заявку"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
