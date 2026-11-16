// ─── Иконки ────────────────────────────────────────────────────────────

function IconMail({
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconPhone({
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin({
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock({
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconTelegram({
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
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.94 4.7l-3.02 14.24c-.23 1.02-.84 1.27-1.7.79l-4.69-3.46-2.26 2.18c-.25.25-.46.46-.94.46l.34-4.76 8.66-7.82c.38-.34-.08-.53-.58-.19L7.06 12.7 2.43 11.25c-1.01-.32-1.03-1.01.21-1.5L20.51 3.4c.84-.31 1.57.2 1.43 1.3z" />
    </svg>
  );
}

function IconInstagram({
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
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Данные ────────────────────────────────────────────────────────────

interface EmailContact {
  id: string;
  label: string;
  email: string;
}

const EMAILS: EmailContact[] = [
  { id: "general", label: "Общие вопросы", email: "info@seagalfund.ru" },
  { id: "press", label: "Для СМИ", email: "info@seagalfund.ru" },
  {
    id: "partnership",
    label: "По вопросам сотрудничества",
    email: "info@seagalfund.ru",
  },
];

const CONTACTS = {
  phone: "(номер телефона)",
  address: "г. Москва, 1-й Колобовский переулок, д. 11",
  hours: "ПН-ПТ: 10:00-19:00",
};

interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
  Icon: (props: { className?: string; size?: number }) => JSX.Element;
}

const SOCIALS: SocialLink[] = [
  {
    id: "telegram",
    label: "Telegram",
    handle: "@seagalfund",
    href: "https://t.me/seagalfund",
    Icon: IconTelegram,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@seagalfund",
    href: "https://instagram.com/seagalfund",
    Icon: IconInstagram,
  },
];

// ─── Секция ────────────────────────────────────────────────────────────

interface ContactsSectionProps {
  /** Показывать H2 «Контакты» + вводный абзац. По умолчанию — да. */
  showHeading?: boolean;
}

export default function ContactsSection({
  showHeading = true,
}: ContactsSectionProps = {}) {
  return (
    <section className="relative bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
        {showHeading && (
          <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-brand-black">
              Контакты
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
              Свяжитесь с менеджерами по вопросам деятельности фонда,
              благотворительных пожертвований и сотрудничества.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {EMAILS.map(({ id, label, email }) => (
            <a
              key={id}
              href={`mailto:${email}`}
              aria-label={`${label}: ${email}`}
              className="group flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 sm:p-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <IconMail size={20} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-neutral-600">
                  {label}
                </span>
                <span className="mt-1 block break-words text-base font-medium text-brand-black sm:text-lg">
                  {email}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-neutral-200 bg-white sm:mt-6">
          <div className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <a
              href={`tel:${CONTACTS.phone}`}
              className="group flex items-start gap-4 p-6 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none sm:p-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <IconPhone size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-neutral-600">
                  Телефон
                </span>
                <span className="mt-1 block break-all text-base font-medium text-brand-black sm:text-lg">
                  {CONTACTS.phone}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 p-6 sm:p-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue">
                <IconMapPin size={20} />
              </span>
              <div className="min-w-0">
                <span className="block text-sm font-medium text-neutral-600">
                  Адрес
                </span>
                <span className="mt-1 block text-base font-medium leading-snug text-brand-black sm:text-lg">
                  {CONTACTS.address}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 sm:p-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue">
                <IconClock size={20} />
              </span>
              <div className="min-w-0">
                <span className="block text-sm font-medium text-neutral-600">
                  Время работы
                </span>
                <span className="mt-1 block text-base font-medium leading-snug text-brand-black sm:text-lg">
                  {CONTACTS.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <h3 className="mb-4 text-base font-semibold text-brand-black sm:mb-5 sm:text-lg">
            Мы в социальных сетях
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {SOCIALS.map(({ id, label, handle, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}: ${handle}`}
                className="group flex items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 sm:p-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-neutral-600">
                    {label}
                  </span>
                  <span className="mt-1 block break-words text-base font-medium text-brand-black sm:text-lg">
                    {handle}
                  </span>
                </span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-neutral-400 transition-colors group-hover:text-brand-blue"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}