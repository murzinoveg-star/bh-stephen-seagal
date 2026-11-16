"use client";

import { useEffect, useRef, useState } from "react";

// ─── Иконки ────────────────────────────────────────────────────────────

function IconCopy({
  className = "",
  size = 18,
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({
  className = "",
  size = 18,
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// Иконка «информация» — для плашки с назначением платежа
function IconInfo({
  className = "",
  size = 20,
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

// ─── Данные ────────────────────────────────────────────────────────────

interface BankDetail {
  id: string;
  label: string;
  /** Значение как есть — отображается и копируется. */
  value: string;
  /** Если true — значение моноширинным шрифтом (счета, ИНН, БИК). */
  mono?: boolean;
}

// TODO: заменить на реальные реквизиты фонда.
const DETAILS: BankDetail[] = [
  {
    id: "recipient",
    label: "Получатель",
    value: "БЛАГОТВОРИТЕЛЬНЫЙ ФОНД СТИВЕНА СИГАЛА",
  },
  {
    id: "inn",
    label: "ИНН",
    value: "0123456789",
    mono: true,
  },
  {
    id: "bank",
    label: "Банк получателя",
    value: "ПАО Сбербанк",
  },
  {
    id: "account",
    label: "Расчётный счёт",
    value: "01234567890123456789",
    mono: true,
  },
  {
    id: "corr-account",
    label: "Корреспондентский счёт",
    value: "01234567890123456789",
    mono: true,
  },
  {
    id: "bik",
    label: "БИК",
    value: "012345678",
    mono: true,
  },
];

// ─── Строка реквизитов ────────────────────────────────────────────────

function DetailRow({ detail }: { detail: BankDetail }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(detail.value);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API недоступен — пользователь выделит текст вручную.
    }
  }

  return (
    <div className="flex flex-col gap-2 border-b border-neutral-200 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
      <div className="min-w-0 sm:flex-1">
        <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm sm:normal-case sm:tracking-normal">
          {detail.label}
        </dt>
        <dd
          className={`mt-1 break-words text-base font-medium leading-snug text-brand-black sm:text-lg ${
            detail.mono ? "font-mono tabular-nums" : ""
          }`}
        >
          {detail.value}
        </dd>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Скопировать: ${detail.label}`}
        className={`inline-flex shrink-0 items-center gap-2 self-start rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 sm:self-auto ${
          copied
            ? "border-green-500/30 bg-green-50 text-green-700"
            : "border-neutral-200 bg-white text-neutral-600 hover:border-brand-blue/30 hover:text-brand-blue"
        }`}
      >
        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        <span>{copied ? "Скопировано" : "Скопировать"}</span>
      </button>
    </div>
  );
}

// ─── Секция ────────────────────────────────────────────────────────────

export default function BankDetailsSection() {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Шапка секции: H2 + вводный текст + акцентная плашка */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Реквизиты для переводов
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
            Для перечисления пожертвования банковским переводом воспользуйтесь
            реквизитами фонда.
          </p>

          {/* Акцентная плашка с назначением платежа */}
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand-blue/15 bg-brand-blue/[0.04] p-4 sm:mt-7 sm:p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white">
              <IconInfo size={18} />
            </span>
            <p className="text-sm leading-relaxed text-brand-black sm:text-base">
              В назначении платежа укажите:{" "}
              <strong className="font-semibold">
                «Пожертвование на уставную деятельность»
              </strong>
              . Если вы поддерживаете конкретное направление — добавьте его
              название.
            </p>
          </div>
        </div>

        {/* Карточка с реквизитами */}
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <dl>
            {DETAILS.map((detail) => (
              <DetailRow key={detail.id} detail={detail} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}