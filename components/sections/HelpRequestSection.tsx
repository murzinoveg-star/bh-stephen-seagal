"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CATEGORIES = [
  { id: "svo", label: "Помощь участникам СВО" },
  { id: "children", label: "Помощь детям" },
  { id: "animals", label: "Помощь животным" },
  { id: "elderly", label: "Помощь старшим" },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Иконка Info
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

// Иконка файла для списка вложений
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

// Иконка удаления файла
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

export default function HelpRequestSection() {
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

  const inputBase =
    "w-full border-b bg-transparent px-0 py-3 text-base text-white placeholder:text-white/50 outline-none transition-colors disabled:opacity-50";

  function fieldClass(field: string, extra = "") {
    const border = errors[field]
      ? "border-red-400/70 focus:border-red-400"
      : "border-white/30 focus:border-white";
    return `${inputBase} ${border} ${extra}`;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-[#121C26] to-[#1a2a3c] py-16 sm:py-16 lg:py-16">
      {/* Фоновое изображение: крупный объект в левом нижнем углу */}
      <div className="pointer-events-none absolute hidden lg:block bottom-0 left-0 z-0 -translate-x-[10%] translate-y-[85%] w-[60vw]">
        <Image
          src="/heart_black.png"
          alt=""
          width={1200}
          height={1200}
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Шапка секции с разделителем */}
        <div className="mb-12 border-b border-white/10 pb-10 lg:mb-16 lg:pb-14">
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-6">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Нужна помощь?
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pb-2">
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                Заполните анкету и подробно расскажите о вашей ситуации. Так
                сотрудники фонда поймут, какая помощь необходима.
              </p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-24">
          {/* Левая колонка: Этапы, видео и пояснения */}
          <div className="lg:col-span-6">
            <div className="space-y-6 text-base leading-relaxed text-white/70 sm:text-lg">
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

            {/* Заглушка под видео Стивена */}
            <div className="mt-10 group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <button className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <span className="glass flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-teal group-hover:text-brand-black">
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
                <span className="text-sm font-medium text-white/60">
                  Видео Стивена
                </span>
              </button>
            </div>

            {/* Пояснение по документам с иконкой (без подложки) */}
            <div className="mt-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-teal">
                <IconInfo size={24} />
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Документы нужны, чтобы подтвердить информацию в заявке, понять,
                какая помощь необходима, и принять решение по обращению. Фонду
                важно документально подтверждать основания для оказания помощи и
                использования благотворительных средств — это часть
                обязательного учёта.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
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
                  Заявка отправлена
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
                  Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней,
                  чтобы уточнить детали и подсказать дальнейшие шаги.
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
                      className="mb-1 block text-sm font-medium text-white/90"
                    >
                      ФИО <span className="text-white">*</span>
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
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-white/90"
                    >
                      Номер телефона <span className="text-white">*</span>
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
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-white/90"
                    >
                      Электронная почта <span className="text-white">*</span>
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
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1 block text-sm font-medium text-white/90"
                    >
                      Город <span className="text-white">*</span>
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
                      aria-describedby={
                        errors.city ? "city-error" : undefined
                      }
                      className={fieldClass("city")}
                    />
                    {errors.city && (
                      <p
                        id="city-error"
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-1 block text-sm font-medium text-white/90"
                    >
                      Категория <span className="text-white">*</span>
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
                        className={`${fieldClass("category")} appearance-none cursor-pointer ${formData.category === "" ? "text-white/50" : "text-white"}`}
                      >
                        <option
                          value=""
                          disabled
                          className="bg-brand-black text-white/50"
                        >
                          Выберите категорию
                        </option>
                        {CATEGORIES.map((c) => (
                          <option
                            key={c.id}
                            value={c.id}
                            className="bg-brand-black text-white"
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
                          className="text-white/50"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.category && (
                      <p
                        id="category-error"
                        className="mt-1.5 text-xs text-red-400"
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
                      className="text-sm font-medium text-white/90"
                    >
                      Расскажите о вашей ситуации{" "}
                      <span className="text-white">*</span>
                    </label>
                    <span className="text-xs tabular-nums text-white/50">
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
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* P2.2: Скрытый input + кнопка прикрепления документов */}
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
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
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

                  {/* Список прикреплённых файлов */}
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <span className="shrink-0 text-brand-teal">
                            <IconFile size={16} />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm text-white/90">
                            {file.name}
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-white/50">
                            {formatSize(file.size)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            disabled={submitting}
                            aria-label={`Удалить файл ${file.name}`}
                            className="shrink-0 rounded-md p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                          >
                            <IconX size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {fileError && (
                    <p className="mt-2 text-xs text-red-400">{fileError}</p>
                  )}
                  <p className="mt-2 text-xs text-white/50">
                    До {MAX_FILES} файлов, до 10 МБ каждый. PDF, JPG, PNG.
                  </p>
                </div>

                {/* Блок с документами (без подложки) */}
                <div>
                  <h4 className="text-sm font-semibold text-white/90">
                    Документы, необходимые для рассмотрения:
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-white/60">
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
                      <span className="text-brand-teal">•</span> Если
                      обращение касается животного: фотографии и, при наличии,
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
                          className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-transparent transition-colors checked:border-white checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                            errors.consent
                              ? "border-red-400/70"
                              : "border-white/40"
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
                        Я согласен(-на) на обработку персональных данных в
                        соответствии с{" "}
                        <a
                          href="#"
                          className="text-white underline underline-offset-2 hover:text-white/80"
                        >
                          политикой конфиденциальности
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p
                        id="consent-error"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold tracking-wide text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d0ff] disabled:cursor-not-allowed disabled:opacity-60"
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