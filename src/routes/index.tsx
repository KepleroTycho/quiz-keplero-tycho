import { useEffect, useRef, useState } from "react";
import { Timer, Trophy, Check, X, Telescope } from "lucide-react";
import { questions } from "@/data/questions";
import { getLeaderboard, submitScore } from "@/services/quiz";
import { cn } from "@/lib/cn";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${r.toFixed(1).padStart(4, "0")}`;
}

type Phase = "start" | "play" | "end";

export function HomePage() {
  const [board, setBoard] = useState(() => getLeaderboard());
  const [phase, setPhase] = useState<Phase>("start");
  const [nick, setNick] = useState("");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<{ id: number; score: number; rank: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const startRef = useRef(0);

  useEffect(() => {
    if (phase !== "play") return;
    const t = setInterval(() => setElapsed((Date.now() - startRef.current) / 1000), 100);
    return () => clearInterval(t);
  }, [phase]);

  function start() {
    if (!nick.trim()) {
      setError("Scegli un nickname per iniziare.");
      return;
    }
    setError("");
    setIdx(0);
    setAnswers([]);
    setPicked(null);
    setResult(null);
    setElapsed(0);
    startRef.current = Date.now();
    setPhase("play");
  }

  function finish(all: number[]) {
    const seconds = (Date.now() - startRef.current) / 1000;
    setElapsed(seconds);
    setPhase("end");
    setError("");
    try {
      setResult(submitScore({ nickname: nick.trim(), seconds, answers: all }));
      setBoard(getLeaderboard());
    } catch {
      setError("Non siamo riusciti a salvare il risultato in classifica.");
    }
  }

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
  }

  function next() {
    if (picked === null) return;
    const all = [...answers, picked];
    setAnswers(all);
    setPicked(null);
    if (idx + 1 >= questions.length) finish(all);
    else setIdx(idx + 1);
  }

  const q = questions[idx];
  const correct = answers.reduce((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);

  return (
    <main className="relative min-h-screen overflow-clip bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(1px_1px_at_20px_30px,var(--foreground),transparent),radial-gradient(1px_1px_at_90px_120px,var(--primary),transparent),radial-gradient(1.5px_1.5px_at_160px_60px,var(--foreground),transparent)] [background-size:200px_160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] size-[44rem] -translate-x-1/2 rounded-full border border-primary/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] size-[32rem] -translate-x-1/2 rounded-full border border-primary/20"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="mb-10 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.25em] text-primary">
            <Telescope className="size-4" /> Uraniborg · Praga
          </p>
          <h1 className="font-display text-4xl font-bold sm:text-6xl">Keplero e Tycho Brahe</h1>
          <p className="mx-auto mt-4 max-w-prose text-muted-foreground">
            Quindici domande, dalle più facili alle più difficili. Il cronometro parte con la prima.
          </p>
        </header>

        {phase === "start" && (
          <section className="mx-auto max-w-md space-y-4">
            <label htmlFor="nick" className="block text-sm font-medium">Il tuo nickname</label>
            <input
              id="nick"
              value={nick}
              maxLength={20}
              onChange={(e) => setNick(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && start()}
              placeholder="Es. AstroMarco"
              className="h-12 w-full rounded-input border border-border bg-card px-4 text-foreground outline-none focus:border-primary"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              onClick={start}
              className="h-12 w-full rounded-btn bg-primary px-6 font-semibold text-primary-foreground hover:opacity-90"
            >
              Inizia il quiz
            </button>
            <p className="text-center text-sm text-muted-foreground">Nessuna registrazione necessaria.</p>
          </section>
        )}

        {phase === "play" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Domanda {idx + 1} di {questions.length} · {nick}
              </span>
              <span className="flex items-center gap-2 font-mono text-lg text-primary">
                <Timer className="size-5" /> {fmt(elapsed)}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
            </div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{q.q}</h2>
            <div className="grid gap-3">
              {q.options.map((o, i) => {
                const isAns = i === q.answer;
                const isPick = i === picked;
                return (
                  <button
                    key={o}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    className={cn(
                      "flex min-h-14 items-center justify-between gap-3 rounded-card border border-border bg-card px-4 py-3 text-left transition-colors",
                      picked === null && "hover:border-primary",
                      picked !== null && isAns && "border-success",
                      picked !== null && isPick && !isAns && "border-destructive",
                    )}
                  >
                    <span>{o}</span>
                    {picked !== null && isAns && <Check className="size-5 shrink-0 text-success" />}
                    {picked !== null && isPick && !isAns && <X className="size-5 shrink-0 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">{picked === q.answer ? "Esatto. " : "Non proprio. "}</strong>
                  {q.note}
                </p>
                <button
                  onClick={next}
                  className="h-12 w-full rounded-btn bg-primary px-6 font-semibold text-primary-foreground hover:opacity-90"
                >
                  {idx + 1 >= questions.length ? "Vedi il risultato" : "Prossima domanda"}
                </button>
              </div>
            )}
          </section>
        )}

        {phase === "end" && (
          <section className="space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Risultato di {nick}</p>
            <p className="font-display text-6xl font-bold">
              {correct}
              <span className="text-3xl text-muted-foreground"> / {questions.length}</span>
            </p>
            <p className="font-mono text-xl">Tempo {fmt(elapsed)}</p>
            {result && (
              <p className="text-muted-foreground">
                Sei al posto <strong className="text-foreground">{result.rank}</strong> su {result.total}.
              </p>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              onClick={() => setPhase("start")}
              className="h-12 rounded-btn bg-primary px-8 font-semibold text-primary-foreground hover:opacity-90"
            >
              Gioca ancora
            </button>
          </section>
        )}

        <section className="mt-16">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold">
            <Trophy className="size-6 text-primary" /> Classifica
          </h2>
          {board.length === 0 ? (
            <p className="rounded-card border border-border bg-card p-6 text-center text-muted-foreground">
              Nessun risultato ancora: sii il primo.
            </p>
          ) : (
            <ol className="divide-y divide-border rounded-card border border-border bg-card">
              {board.map((e, i) => (
                <li
                  key={e.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3",
                    result?.id === e.id && "bg-primary/10",
                  )}
                >
                  <span className="w-6 font-mono text-muted-foreground">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-medium">{e.nickname}</span>
                  <span className="font-mono">{e.score}/{questions.length}</span>
                  <span className="w-16 text-right font-mono text-muted-foreground">{fmt(e.seconds)}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  );
}
