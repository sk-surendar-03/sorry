import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Moon, Sun, Smile, Volume2, VolumeX } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

// 👇 Customize these for your friend
const FRIEND_NAME = "Alex";
const SPECIFIC_SORRY = "I'm sorry I bailed on you and made you feel like you didn't matter.";
const MEMORIES = [
  { src: memory1, caption: "that night we couldn't stop laughing" },
  { src: memory2, caption: "our late-night talks about everything" },
  { src: memory3, caption: "all the small dumb moments that meant a lot" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Hey ${FRIEND_NAME} — I'm Sorry` },
      { name: "description", content: "An honest apology from a friend who messed up and wants to make it right." },
    ],
  }),
  component: Index,
});

function useTypewriter(text: string, speed = 45, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

const floaters = Array.from({ length: 16 });

function Index() {
  const [dark, setDark] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.25;
    if (muted) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
  }, [muted]);

  const sub = useTypewriter(`I never wanted to hurt you, ${FRIEND_NAME}.`, 55);
  const apology = useApologyOnView();

  const triggerBurst = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = Date.now();
    setBursts((b) => [...b, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1000);
  };

  const why = useInView<HTMLDivElement>();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-warm scroll-smooth">
      {/* Floating background icons */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {floaters.map((_, i) => {
          const Icon = i % 2 === 0 ? Heart : Smile;
          return (
            <Icon
              key={i}
              className={`absolute animate-float-heart ${i % 2 === 0 ? "text-accent/40" : "text-primary/30"}`}
              style={{
                left: `${(i * 6.4) % 100}%`,
                width: `${14 + (i % 4) * 6}px`,
                height: `${14 + (i % 4) * 6}px`,
                animationDuration: `${16 + (i % 5) * 4}s`,
                animationDelay: `${i * 1.1}s`,
              }}
              fill={i % 2 === 0 ? "currentColor" : "none"}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="fixed right-6 top-6 z-50 flex gap-2">
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label="Toggle music"
          className="rounded-full border border-border bg-card/70 p-3 backdrop-blur-md transition hover:scale-110 shadow-soft"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="rounded-full border border-border bg-card/70 p-3 backdrop-blur-md transition hover:scale-110 shadow-soft"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e49cae.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3"
      />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-60" />
        <div className="max-w-3xl text-center animate-fade-up">
          <p className="font-handwritten text-2xl text-primary mb-4">a little message for you,</p>
          <h1 className="font-handwritten text-6xl md:text-8xl text-foreground leading-none">
            Hey {FRIEND_NAME}…
            <span className="block text-primary italic mt-2" style={{ fontFamily: "var(--font-serif)" }}>
              I'm Sorry 😔
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed min-h-[2.5em]">
            {sub}
            <span className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle animate-shimmer" />
          </p>
          <div className="mt-12 flex justify-center gap-2">
            <Heart className="h-6 w-6 text-accent animate-shimmer" fill="currentColor" />
            <Smile className="h-6 w-6 text-primary animate-shimmer" />
          </div>
        </div>
      </section>

      {/* Apology */}
      <section ref={apology.ref} className="relative z-10 px-6 py-24">
        <div className={`mx-auto max-w-2xl transition-all duration-1000 ${apology.seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="rounded-3xl bg-card/80 backdrop-blur-md p-10 md:p-14 shadow-soft border border-border/50">
            <p className="font-handwritten text-3xl text-primary mb-6">my apology —</p>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90 min-h-[10rem]" style={{ fontFamily: "var(--font-serif)" }}>
              <ApologyTyping start={apology.seen} />
            </div>
          </div>
        </div>
      </section>

      {/* Memories */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-handwritten text-3xl text-primary">our memories</p>
            <h2 className="text-4xl md:text-5xl mt-2">These moments mean a lot to me.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {MEMORIES.map((m, i) => (
              <FadeUp key={i} delay={i * 120}>
                <figure className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={m.src}
                      alt={m.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <figcaption className="font-handwritten text-xl text-center py-5 text-muted-foreground transition-colors group-hover:text-primary">
                    {m.caption}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why You Matter */}
      <section ref={why.ref} className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="font-handwritten text-3xl text-primary">why you matter</p>
            <h2 className="text-4xl md:text-5xl mt-2">You're one of my people, {FRIEND_NAME}.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "You always had my back, even when I didn't deserve it.",
              "You made me laugh when I really, really needed it.",
              "Life's just better with you in it. That's the truth.",
            ].map((t, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-card/80 backdrop-blur-md p-8 shadow-soft border border-border/50 transition-all duration-700 ${
                  why.seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <Heart className="h-6 w-6 text-accent mb-4" fill="currentColor" />
                <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's fix this */}
      <section className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl bg-gradient-soft p-12 md:p-16 shadow-glow">
            <h2 className="text-4xl md:text-6xl">Can we fix this?</h2>
            <p className="mt-6 text-lg text-foreground/80">
              No pressure. Whenever you're ready — I'll be here.
            </p>
            <button
              onClick={triggerBurst}
              className="group relative mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-glow shadow-soft overflow-visible"
            >
              <Heart className="h-4 w-4 transition-transform group-hover:scale-125" fill="currentColor" />
              Talk to me 🙏
              {bursts.map((b) => (
                <span key={b.id} className="pointer-events-none absolute" style={{ left: b.x, top: b.y }}>
                  {[...Array(8)].map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute text-accent animate-heart-burst"
                      fill="currentColor"
                      style={{
                        width: 14, height: 14,
                        ["--bx" as any]: `${Math.cos((i / 8) * Math.PI * 2) * 60}px`,
                        ["--by" as any]: `${Math.sin((i / 8) * Math.PI * 2) * 60}px`,
                      }}
                    />
                  ))}
                </span>
              ))}
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-20 text-center">
        <p className="font-handwritten text-5xl md:text-7xl text-primary animate-fade-up">I miss our ❤️</p>
        <Heart className="mx-auto mt-6 h-5 w-5 text-accent animate-shimmer" fill="currentColor" />
      </footer>
    </div>
  );
}

function useApologyOnView() {
  return useInView<HTMLDivElement>();
}

function ApologyTyping({ start }: { start: boolean }) {
  const lines = [
    `${SPECIFIC_SORRY}`,
    `I know I messed up. I didn't think it through, and I hurt you — and that's on me.`,
    `You don't have to forgive me right away. I just needed you to know I see it, and I'm really, really sorry.`,
  ];
  const [idx, setIdx] = useState(0);
  const current = useTypewriter(lines[idx] ?? "", 30, start);
  useEffect(() => {
    if (!start) return;
    if (current === lines[idx] && idx < lines.length - 1) {
      const t = setTimeout(() => setIdx((i) => i + 1), 600);
      return () => clearTimeout(t);
    }
  }, [current, idx, start]);
  return (
    <>
      {lines.slice(0, idx).map((l, i) => (
        <p key={i}>{l}</p>
      ))}
      {start && (
        <p>
          {current}
          <span className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle animate-shimmer" />
        </p>
      )}
      {idx === lines.length - 1 && current === lines[idx] && (
        <p className="font-handwritten text-2xl text-primary pt-4">— me.</p>
      )}
    </>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
