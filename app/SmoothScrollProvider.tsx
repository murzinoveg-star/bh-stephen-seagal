// app/SmoothScrollProvider.tsx
"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Это ключевой параметр для эффекта инерции.
        // Чем меньше значение, тем более "вязким" и медленным будет скролл.
        // 0.08-0.1 — хорошая отправная точка для эффекта "толчка".
        lerp: 0.08, 
        
        // Включает плавность для колесика мыши. (По умолчанию true, но лучше указать явно)
        smoothWheel: true,
        
        // Немного уменьшает "шаг" за один тик колесика, чтобы движение было мягче.
        wheelMultiplier: 0.9,
        
        // P2.4: Отключаем плавный скролл, если пользователь предпочитает
        // уменьшенное движение (prefers-reduced-motion: reduce).
        prefersReducedMotion: true,
        
        // Отключаем авто-RAF, если вы планируете синхронизировать Lenis с другими анимациями (например, GSAP).
        // Если у вас нет сложной анимационной логики, можно оставить false (по умолчанию).
        // autoRaf: false, 
      }}
    >
      {children}
    </ReactLenis>
  );
}