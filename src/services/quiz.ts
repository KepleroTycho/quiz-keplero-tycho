import { questions } from "@/data/questions";

export type Entry = { id: number; nickname: string; score: number; seconds: number };

// Classifica salvata nel browser di chi gioca (localStorage): nessun server necessario.
const KEY = "quiz-keplero-tycho:scores";

function load(): Entry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function sorted(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => b.score - a.score || a.seconds - b.seconds || a.id - b.id);
}

export function getLeaderboard(limit = 10): Entry[] {
  return sorted(load()).slice(0, limit);
}

export function submitScore(input: { nickname: string; seconds: number; answers: number[] }) {
  const score = input.answers.reduce((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);
  const seconds = Math.round(input.seconds * 10) / 10;
  const all = load();
  const id = all.reduce((m, r) => Math.max(m, r.id), 0) + 1;
  const better = all.filter((r) => r.score > score || (r.score === score && r.seconds < seconds)).length;
  const next = [...all, { id, nickname: input.nickname.slice(0, 20), score, seconds }];
  localStorage.setItem(KEY, JSON.stringify(sorted(next).slice(0, 200)));
  return { id, score, rank: better + 1, total: next.length };
}
