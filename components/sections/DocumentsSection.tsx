// Иконка файла — та же, что в HelpRequestSection
function IconFile({
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
      strokeWidth="1.75"
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

// Иконка скачивания
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

interface DocumentItem {
  id: string;
  title: string;
  /** TODO: заменить на реальные PDF, когда будут готовы. */
  href: string;
}

const DOCUMENTS: DocumentItem[] = [
  { id: "requisites", title: "Реквизиты", href: "#" },
  { id: "egrn", title: "Выписка из ЕГРН", href: "#" },
  {
    id: "charter",
    title: "Устав Благотворительного фонда Стивена Сигала",
    href: "#",
  },
  {
    id: "registration",
    title: "Свидетельство о регистрации юридического лица",
    href: "#",
  },
  {
    id: "offer",
    title: "Публичная оферта на осуществление пожертвований",
    href: "#",
  },
  {
    id: "pd-consent",
    title: "Согласие на обработку персональных данных",
    href: "#",
  },
];

export default function DocumentsSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {/* Заголовок секции */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
            Документы
          </h2>
        </div>

        {/* Карточка со списком */}
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <ul>
            {DOCUMENTS.map((doc, index) => (
              <li
                key={doc.id}
                className={`border-neutral-200 ${
                  index !== DOCUMENTS.length - 1 ? "border-b" : ""
                }`}
              >
                <a
                  href={doc.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none sm:px-6 sm:py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue/10">
                    <IconFile size={20} />
                  </span>

                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-brand-black sm:text-base">
                    {doc.title}
                  </span>

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors group-hover:bg-brand-blue group-hover:text-white"
                    aria-hidden="true"
                  >
                    <IconDownload size={18} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}