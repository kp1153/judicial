import { db } from "@/lib/db";
import { hearings, cases } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function POST(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { caseId, date, nextDate, outcome, notes } = body;

  if (!caseId || !date) return Response.json({ error: "caseId and date required" }, { status: 400 });

  const inserted = await db.insert(hearings).values({
    caseId,
    userId: session.userId,
    date,
    nextDate: nextDate || null,
    outcome: outcome || null,
    notes: notes || null,
  }).returning();

  if (nextDate) {
    await db.update(cases).set({ nextDate }).where(eq(cases.id, caseId));
  }

  return Response.json({ hearing: inserted[0] });
}