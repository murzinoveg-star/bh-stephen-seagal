import Link from "next/link";
import Image from "next/image";

// TODO: заменить контакты и юридические данные на подтверждённые из CMS.
// В content.json значения помечены как "[телефон]", "[email]", "[адрес]",
// "[полное наименование, ИНН/ОГРН — уточнить]".
const CONTACTS = {
  phone: "[телефон]",
  email: "[email]",
  address: "[адрес]"
};

const NAV = [
  { label: "Главная", href: "/" },
  { label: "О фонде", href: "/about" },
  { label: "Программы", href: "/programs" },
  { label: "Как помочь", href: "/donate" },
  { label: "Отчётность", href: "/reports" },
  { label: "Мне нужна помощь", href: "/help-request" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-black text-white">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10 lg:pt-24">
        {/* Верхний блок: логотип + миссия + язык */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center" aria-label="БФ Стивена Сигала">
              <Image
                src="/logo-white.svg" // Укажите ваш файл (например, /logo-white.svg)
                alt="БФ Стивена Сигала"
                width={200}
                height={50}
                className="h-11 w-auto object-contain lg:h-12"
              />
            </Link>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Помогаем участникам СВО — юридической и психологической
              поддержкой, детям, животным и старшим. Действуем прозрачно и
              объясняем, как получить помощь и куда идут средства.
            </p>
          </div>

          <div className="lg:col-span-7">
            <nav
              aria-label="Навигация в подвале"
              className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-brand-teal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Средний блок: контакты + юр. информация + язык */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Контакты
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-white/40">Телефон</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${CONTACTS.phone}`}
                    className="text-white/80 transition-colors hover:text-brand-teal"
                  >
                    {CONTACTS.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/40">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="text-white/80 transition-colors hover:text-brand-teal"
                  >
                    {CONTACTS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/40">Адрес</dt>
                <dd className="mt-1 text-white/80">{CONTACTS.address}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Документы
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand-teal"
                >
                  Отчётность
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
              <li className="text-white/40">
                Устав и юридические документы — в разделе «Отчётность»
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Язык
            </h3>
            <div className="mt-5 inline-flex items-center rounded-full border border-white/15 p-1 text-xs font-semibold">
              <span className="rounded-full bg-brand-teal px-3 py-1 text-brand-black">
                RU
              </span>
              <button
                type="button"
                disabled
                className="px-3 py-1 text-white/50"
                aria-label="Английская версия появится после утверждения"
              >
                EN
              </button>
            </div>
            <p className="mt-3 text-[11px] text-white/40">
              Английская версия — после утверждения русской.
            </p>
          </div>
        </div>

        {/* Нижний блок: юр. инфо + copyright */}
        <div className="flex flex-col gap-4 pt-8 text-xs text-white/40 lg:flex-row lg:items-center lg:justify-between">
          <p>
            БЛАГОТВОРИТЕЛЬНЫЙ ФОНД СТИВЕНА СИГАЛА · ИНН/ОГРН — уточнить
          </p>
          <p>© {new Date().getFullYear()} БФ Стивена Сигала. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}