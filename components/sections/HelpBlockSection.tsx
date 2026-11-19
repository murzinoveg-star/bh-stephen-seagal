"use client";

import Image from "next/image";
import DonationForm from "@/components/forms/DonationForm";

interface HelpBlockSectionProps {
  /** Заменяет первый абзац под заголовком «Как помочь?». */
  introText?: string;
  /** Список направлений для выбора в форме. Если не передан — селектора нет. */
  programs?: Array<{ id: string; label: string }>;
  /** ID направления по умолчанию. Должен присутствовать в programs. */
  defaultProgramId?: string;
  /** Уникальные сообщения об успехе для конкретных направлений (по id). */
  successByProgramId?: Record<
    string,
    { title: string; description: string }
  >;
  /** Фолбэк, если для выбранного направления нет уникального сообщения. */
  defaultSuccess?: { title: string; description: string };
}

export default function HelpBlockSection({
  introText,
  programs,
  defaultProgramId,
  successByProgramId,
  defaultSuccess,
}: HelpBlockSectionProps = {}) {
  return (
    <section className="relative bg-neutral-50 px-2 py-16 sm:px-4 sm:py-16 lg:px-6 lg:py-16">
      <div
        className="relative mx-auto flex w-full max-w-[1920px] flex-col overflow-hidden rounded-3xl lg:rounded-[48px]"
        style={{
          backgroundImage: "linear-gradient(135deg, #08338f 30%, #00b8e0 100%)",
        }}
      >

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 sm:py-16 lg:px-10 lg:py-16">

          {/* Картинка сердца в левом нижнем углу */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-0 hidden -translate-x-[120%] translate-y-[40%] lg:block">
          <Image
            src="/heart_dark.png"
            alt=""
            width={750}
            height={750}
            className="h-auto w-full object-contain"
          />
        </div>

          {/* Сетка 6/6 */}
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Левая колонка: Текст */}
            <div className="lg:col-span-6 lg:pr-8">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Как помочь?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:mt-7 sm:text-lg lg:text-xl">
                {introText ??
                  "Отправить пожертвование можно на любую удобную сумму по QR-коду или банковской картой."}
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
                Выберите разовый перевод или ежемесячное пожертвование.
                Постоянные поступления позволяют фонду оказывать стабильную
                регулярную поддержку.
              </p>
            </div>

            {/* Правая колонка: Форма */}
            <div className="min-h-[480px] lg:col-span-6 lg:min-h-[620px]">
              <DonationForm
                programs={programs}
                defaultProgramId={defaultProgramId}
                successByProgramId={successByProgramId}
                defaultSuccess={defaultSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}