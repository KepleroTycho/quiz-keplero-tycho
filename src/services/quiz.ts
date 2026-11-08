import { questions } from "@/data/questions";

export type Entry = { id: string; nickname: string; score: number; seconds: number };
export type SubmitResult = { id: string; score: number; rank: number; total: number };

// La classifica sta in un database condiviso (Upstash Redis), raggiunto tramite /api/leaderboard su Vercel.
export async function getLeaderboard(): Promise<Entry[]> {
  const res = await fetch("/api/leaderboard");
  if (!res.ok) throw new Error("leaderboard");
  return res.json();
}

export async function submitScore(input: { nickname: string; seconds: number; answers: number[] }): Promise<SubmitResult> {
  const score = input.answers.reduce((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);
  const res = await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ nickname: input.nickname, seconds: input.seconds, score }),
  });
  if (!res.ok) throw new Error("submit");
  return res.json();
}
