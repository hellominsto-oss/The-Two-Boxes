import { useEffect, useState, useRef } from "react";
import { useI18n } from "@/i18n";

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const { t, dir } = useI18n();
  const totalMs = 4500;
  const [percent, setPercent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPercent(100);
      const id = window.setTimeout(() => onFinish(), 300);
      return () => window.clearTimeout(id);
    }

    function step(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setPercent(p);
      if (elapsed >= totalMs) {
        // wait a short moment to let the final animation frame settle
        window.setTimeout(() => onFinish(), 220);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onFinish]);

  return (
    <div
      dir={dir}
      className="flex min-h-[100dvh] items-center justify-center bg-ink-950 text-slate-200"
    >
      <style>{`
        .loading-scene { width:100%; max-width:420px; padding:28px; box-sizing:border-box; }
        .ornament { position:absolute; inset:0; pointer-events:none; opacity:0.06; background-image: radial-gradient(ellipse at top left, rgba(201,154,61,0.06), transparent 20%), radial-gradient(ellipse at bottom right, rgba(201,154,61,0.04), transparent 30%); }
        .coin-scene { perspective: 900px; display:flex; align-items:center; justify-content:center; }
        .coin-wrap { width:160px; height:160px; position:relative; }
        @media (min-width:640px) { .coin-wrap { width:192px; height:192px; } }
        .coin { width:100%; height:100%; transform-style: preserve-3d; transform-origin:50% 50%; backface-visibility: hidden; }
        .coin-face { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:contain; backface-visibility:hidden; border-radius:9999px; }
        .coin-face.back { transform: rotateY(180deg); }
        @keyframes coin-flip {
          0% { transform: rotateY(0deg) translateZ(0) scale(1); }
          33.333% { transform: rotateY(180deg) translateZ(0) scale(1.02); }
          66.666% { transform: rotateY(360deg) translateZ(0) scale(0.98); }
          100% { transform: rotateY(540deg) translateZ(0) scale(1); }
        }
        .coin-anim { animation-name: coin-flip; animation-timing-function: cubic-bezier(0.22,0.9,0.36,1); animation-fill-mode: forwards; animation-duration: ${totalMs}ms; }

        .progress-track { height:10px; background: rgba(255,255,255,0.04); border-radius:9999px; overflow:hidden; }
        .progress-fill { height:100%; background: linear-gradient(90deg, #D6A84B, #E5C36A); width:0%; transition: width 150ms linear; }
        @media (prefers-reduced-motion: reduce) { .coin-anim { animation:none !important; } .progress-fill { transition:none !important; } }
      `}</style>

      <div className="relative w-full flex-1 flex items-center justify-center">
        <div className="ornament" aria-hidden />
        <div className="loading-scene text-center">
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold tracking-tight text-gold-light">
              {t.appName.toUpperCase()}
            </h1>
            <div className="mt-1 text-sm text-slate-400">{t.appTagline}</div>
          </div>

          <div className="coin-scene mb-6">
            <div className="coin-wrap" aria-hidden>
              <div
                className={`coin coin-anim`}
                style={{ willChange: "transform" }}
              >
                <img
                  src="/assets/coin/2.png"
                  alt=""
                  className="coin-face front"
                  draggable={false}
                />
                <img
                  src="/assets/coin/1.png"
                  alt=""
                  className="coin-face back"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 px-4">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <div className="mt-2 text-xs text-slate-400">{percent}%</div>
          </div>

          <div className="mt-6 text-xs text-slate-400">
            Tip:{" "}
            {t.setupBlurb
              ? t.setupBlurb(100)
              : "Prepare to split your coins carefully."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
