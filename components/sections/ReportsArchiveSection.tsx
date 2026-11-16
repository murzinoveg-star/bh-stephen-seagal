"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Иконки ────────────────────────────────────────────────────────────

function IconDownload({
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function IconChevronDown({
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconFolder({
  className = "",
  size = 32,
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ─── Модель данных ────────────────────────────────────────────────────

interface Report {
  id: string;
  /** Полное название, отображается в карточке. */
  title: string;
  /** Дата в человекочитаемом виде. */
  date: string;
  /** Год — для фильтрации и группировки. */
  year: number;
  /** Обложка карточки (aspect-[4/3]). */
  image: string;
  /** Внутренняя страница отчёта: /reports/[id]. */
  href: string;
  /** Прямая ссылка на файл для сводного скачивания (опционально). */
  downloadUrl?: string;
}

// TODO: заменить на реальные отчёты, когда они появятся.
// Пока — 4 временные заглушки, чтобы отревьюить полный UI.
// Когда данных не будет — оставить пустой массив: [],
// и компонент автоматически покажет empty state.
const REPORTS: Report[] = [
  {
    id: "annual-2024",
    title: "Годовой отчёт за 2024 год",
    date: "31 декабря 2024",
    year: 2024,
    image: "/reports/placeholder-1.jpg",
    href: "/reports/annual-2024",
    downloadUrl: "#",
  },
  {
    id: "q4-2024",
    title: "Отчёт за IV квартал 2024",
    date: "31 декабря 2024",
    year: 2024,
    image: "/reports/placeholder-2.jpg",
    href: "/reports/q4-2024",
    downloadUrl: "#",
  },
  {
    id: "q3-2024",
    title: "Отчёт за III квартал 2024",
    date: "30 сентября 2024",
    year: 2024,
    image: "/reports/placeholder-3.jpg",
    href: "/reports/q3-2024",
  },
  {
    id: "annual-2023",
    title: "Годовой отчёт за 2023 год",
    date: "31 декабря 2023",
    year: 2023,
    image: "/reports/placeholder-4.jpg",
    href: "/reports/annual-2023",
    downloadUrl: "#",
  },
];

// ─── Вспомогательные функции ──────────────────────────────────────────

function formatYearLabel(year: number) {
  return `${year}`;
}

// ─── Секция ────────────────────────────────────────────────────────────

export default function ReportsArchiveSection() {
  // Список лет, доступных для скачивания (только там, где есть downloadUrl).
  const downloadYears = Array.from(
    new Set(REPORTS.filter((r) => !!r.downloadUrl).map((r) => r.year)),
  ).sort((a, b) => b - a);

  // Список лет для фильтра карточек.
  const filterYears = Array.from(new Set(REPORTS.map((r) => r.year))).sort(
    (a, b) => b - a,
  );

  const [downloadYear, setDownloadYear] = useState<number | null>(
    downloadYears[0] ?? null,
  );
  const [filterYear, setFilterYear] = useState<number | "all">("all");

  const filteredReports =
    filterYear === "all"
      ? REPORTS
      : REPORTS.filter((r) => r.year === filterYear);

  const selectedDownloadReport =
    downloadYear !== null
      ? REPORTS.find((r) => r.year === downloadYear && !!r.downloadUrl)
      : undefined;

  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок секции */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Отчёты
          </h2>
        </div>

        {REPORTS.length === 0 ? (
          // ── Empty state ────────────────────────────────────────────
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-12 sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue sm:h-16 sm:w-16">
                <IconFolder size={32} />
              </div>
              <h3 className="text-xl font-medium text-brand-black sm:text-2xl">
                Отчёты пока не опубликованы
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Документы будут размещаться по мере завершения отчётных
                периодов. Следите за обновлениями на сайте.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ── Controls ──────────────────────────────────────────── */}
            <div className="mb-8 grid gap-6 sm:mb-10 sm:gap-8 lg:grid-cols-2">
              {/* Download: скачать сводный отчёт за год */}
              <div>
                <label
                  htmlFor="reports-download-year"
                  className="mb-3 block text-sm font-medium text-neutral-600"
                >
                  Скачать отчёт за год
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <select
                      id="reports-download-year"
                      value={downloadYear ?? ""}
                      onChange={(e) =>
                        setDownloadYear(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      disabled={downloadYears.length === 0}
                      className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white py-2.5 pl-3 pr-10 text-base text-brand-black outline-none transition-colors hover:border-brand-blue/40 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {downloadYears.length === 0 && (
                        <option value="">Нет доступных отчётов</option>
                      )}
                      {downloadYears.map((y) => (
                        <option key={y} value={y}>
                          {formatYearLabel(y)}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
                      <IconChevronDown size={18} />
                    </span>
                  </div>

                  <a
                    href={selectedDownloadReport?.downloadUrl ?? "#"}
                    download
                    aria-disabled={!selectedDownloadReport?.downloadUrl}
                    onClick={(e) => {
                      if (!selectedDownloadReport?.downloadUrl) {
                        e.preventDefault();
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 sm:w-auto ${
                      selectedDownloadReport?.downloadUrl
                        ? "bg-brand-blue text-white hover:bg-[#0a3fad]"
                        : "cursor-not-allowed bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    <IconDownload size={16} />
                    <span>Скачать</span>
                  </a>
                </div>
              </div>

              {/* Filter: период для карточек */}
              <div>
                <label
                  htmlFor="reports-filter-year"
                  className="mb-3 block text-sm font-medium text-neutral-600"
                >
                  Период
                </label>
                <div className="relative">
                  <select
                    id="reports-filter-year"
                    value={filterYear}
                    onChange={(e) =>
                      setFilterYear(
                        e.target.value === "all"
                          ? "all"
                          : Number(e.target.value),
                      )
                    }
                    className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white py-2.5 pl-3 pr-10 text-base text-brand-black outline-none transition-colors hover:border-brand-blue/40 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                  >
                    <option value="all">Все годы</option>
                    {filterYears.map((y) => (
                      <option key={y} value={y}>
                        {formatYearLabel(y)}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
                    <IconChevronDown size={18} />
                  </span>
                </div>
              </div>
            </div>

            {/* ── Cards grid ────────────────────────────────────────── */}
            {filteredReports.length === 0 ? (
              <p className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-6 text-center text-sm text-neutral-600 sm:text-base">
                Отчётов за выбранный период нет.
              </p>
            ) : (
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                {filteredReports.map((report) => (
                  <Link
                    key={report.id}
                    href={report.href}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/10"
                  >
                    {/* Обложка */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={report.image}
                        alt={report.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Название и дата */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-medium leading-snug text-brand-black sm:text-xl">
                        {report.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500">
                        {report.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
