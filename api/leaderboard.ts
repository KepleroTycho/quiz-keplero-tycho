import { Redis } from "@upstash/redis";
import { randomUUID } from "node:crypto";

type Req = { method?: string; body?: unknown };
type Res = {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
};
type Entry = { id: string; nickname: string; score: number; seconds: number };

const KEY = "quiz-keplero-tycho:board";

// Vercel imposta queste variabili quando colleghi Upstash al progetto (nomi vecchi e nuovi).
function connect() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Database non collegato");
  return new Redis({ url, token });
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const db = connect();

    if (req.method === "GET") {
      const top = await db.zrange<Entry[]>(KEY, 0, 9, { rev: true });
      return res.status(200).json(top);
    }

    if (req.method === "POST") {
      const b = (req.body ?? {}) as Record<string, unknown>;
      const nickname = String(b.nickname ?? "").trim().slice(0, 20);
      const score = Number(b.score);
      const seconds = Math.round(Number(b.seconds) * 10) / 10;
      if (!nickname || !Number.isInteger(score) || score < 0 || score > 100 || !(seconds >= 0 && seconds <= 86400)) {
        return res.status(400).json({ error: "Dati non validi" });
      }
      // Più risposte giuste = valore più alto; a parità, meno secondi = valore più alto.
      const value = score * 1_000_000 - Math.round(seconds * 10);
      const entry: Entry = { id: randomUUID(), nickname, score, seconds };
      const p = db.pipeline();
      p.zcount(KEY, `(${value}`, "+inf");
      p.zadd(KEY, { score: value, member: entry });
      p.zcard(KEY);
      const [better, , total] = await p.exec<[number, number, number]>();
      return res.status(200).json({ id: entry.id, score, rank: better + 1, total });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Metodo non consentito" });
  } catch {
    return res.status(500).json({ error: "Errore del server" });
  }
}
