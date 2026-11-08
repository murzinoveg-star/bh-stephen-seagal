import Link from "next/link";
import Image from "next/image";

const CONTACTS = {
  phone: "[телефон]",
  email: "[email]",
  address: "[адрес]",
};

const NAV = [
  { label: "Главная", href: "/" },
  { label: "О фонде", href: "/about" },
  { label: "Программы", href: "/programs" },
  { label: "Как помочь", href: "/donate" },
  { label: "Отчётность", href: "/reports" },
  { label: "Мне нужна помощь", href: "/help-request" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-black text-white">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="БФ Стивена Сигала"
            >
              <Image
                src="/logo-white.svg"
                alt="БФ Стивена Сигала"
                width={200}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert sm:h-11 lg:h-12"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:mt-6">
              Мы улучшаем качество жизни, возвращая людям и тем, кто им дорог,
              уверенность в завтрашнем дне, веру в доброту и справедливость
            </p>
          </div>

          <div className="lg:col-span-7">
            <nav
              aria-label="Навигация в подвале"
              className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 sm:gap-x-8"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 transition-colors hover:text-brand-teal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium text-brand-teal">Контакты</h3>
            <dl className="mt-4 space-y-3 text-sm sm:mt-5">
              <div>
                <dt className="text-white/50">Телефон</dt>
                <dd className="mt-1 break-all">
                  <a
                    href={`tel:${CONTACTS.phone}`}
                    className="text-white/80 transition-colors hover:text-brand-teal"
                  >
                    {CONTACTS.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Email</dt>
                <dd className="mt-1 break-all">
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="text-white/80 transition-colors hover:text-brand-teal"
                  >
                    {CONTACTS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Адрес</dt>
                <dd className="mt-1 text-white/80">{CONTACTS.address}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium text-brand-teal">Документы</h3>
            <ul className="mt-4 space-y-3 text-sm sm:mt-5">
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
              <li className="text-white/50">
                Устав и юридические документы — в разделе «Отчётность»
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium text-brand-teal">Язык</h3>
            <div className="mt-4 flex items-center text-xs font-semibold sm:mt-5">
              <span className="text-white">RU</span>
              <span className="mx-1.5 text-white/30">/</span>
              <button
                type="button"
                disabled
                className="text-white/50"
                aria-label="Английская версия появится после утверждения"
              >
                EN
              </button>
            </div>
            <p className="mt-3 text-xs text-white/50">
              Английская версия — после утверждения русской.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/50 sm:gap-4 sm:pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p>БЛАГОТВОРИТЕЛЬНЫЙ ФОНД СТИВЕНА СИГАЛА · ИНН/ОГРН — уточнить</p>
          <p>
            © {new Date().getFullYear()} БФ Стивена Сигала. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
