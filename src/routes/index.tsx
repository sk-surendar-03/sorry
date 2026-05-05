import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Moon, Sun, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I'm Really Sorry — A heartfelt apology" },
      { name: "description", content: "An honest apology to a friend I miss. I never meant to hurt you." },
    ],
  }),
  component: Index,
});

const hearts = Array.from({ length: 12 });

function Index() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-warm">
      {/* Floating hearts */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {hearts.map((_, i) => (
          <Heart
            key={i}
            className="absolute text-accent/40 animate-float-heart"
            style={{
              left: `${(i * 8.3) % 100}%`,
              width: `${12 + (i % 4) * 6}px`,
              height: `${12 + (i % 4) * 6}px`,
              animationDuration: `${15 + (i % 5) * 4}s`,
              animationDelay: `${i * 1.3}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
        className="fixed right-6 top-6 z-50 rounded-full border border-border bg-card/70 p-3 backdrop-blur-md transition hover:scale-110 shadow-soft"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-60" />

        <div className="max-w-3xl text-center animate-fade-up">
          <p className="font-handwritten text-2xl text-primary mb-4 animate-shimmer">to my dearest friend,</p>
          <h1 className="font-handwritten text-7xl md:text-9xl text-foreground leading-none">
            I'm Really
            <span className="block text-primary italic" style={{ fontFamily: "var(--font-serif)" }}>
              Sorry
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I never meant to hurt you. And if you'll let me, I'd like a chance to make this right.
          </p>
          <div className="mt-12 flex justify-center">
            <Heart className="h-6 w-6 text-accent animate-shimmer" fill="currentColor" />
          </div>
        </div>
      </section>

      {/* Letter */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-card/80 backdrop-blur-md p-10 md:p-16 shadow-soft border border-border/50">
            <p className="font-handwritten text-3xl text-primary mb-6">A letter, from me to you —</p>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-serif)" }}>
              <p>I know I hurt you, and I'm really sorry.</p>
              <p>
                You mean a lot to me, and I hate that I caused this distance between us. I've been
                replaying it in my head, and I wish I could take it back.
              </p>
              <p>
                I don't expect everything to be okay instantly. But I want you to know — every part of
                this matters to me. <em>You</em> matter to me.
              </p>
              <p className="font-handwritten text-2xl text-primary pt-4">— me.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Memories */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-handwritten text-3xl text-primary">remember when…</p>
            <h2 className="text-4xl md:text-5xl mt-2">These moments mean everything.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { src: memory1, caption: "the way you laughed that night" },
              { src: memory2, caption: "every long, slow conversation" },
              { src: memory3, caption: "and the small bright things" },
            ].map((m, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={m.src}
                    alt={m.caption}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="font-handwritten text-xl text-center py-5 text-muted-foreground">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-handwritten text-3xl text-primary mb-4">because…</p>
          <h2 className="text-3xl md:text-5xl leading-tight">
            Friendships like ours don't come around often.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            You're the person I want to text first when something good happens. The one I trust with the
            messy stuff. Losing that — losing <em>you</em> — isn't something I'm willing to accept without
            trying.
          </p>
        </div>
      </section>

      {/* Make it right */}
      <section className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl bg-gradient-soft p-12 md:p-16 shadow-glow">
            <h2 className="text-4xl md:text-6xl">I want to fix this.</h2>
            <p className="mt-6 text-lg text-foreground/80">
              No pressure. No expectations. Just — whenever you're ready.
            </p>
            <a
              href="mailto:?subject=Hey..."
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium transition-all hover:scale-105 shadow-soft"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Can we talk?
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-20 text-center">
        <p className="font-handwritten text-5xl md:text-7xl text-primary">I miss you.</p>
        <Heart className="mx-auto mt-6 h-5 w-5 text-accent animate-shimmer" fill="currentColor" />
      </footer>
    </div>
  );
}
