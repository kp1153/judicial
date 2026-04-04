import { db } from "@/lib/db";
import { cases } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const allCases = await db.select().from(cases).where(eq(cases.userId, session.userId));
  return Response.json({ cases: allCases });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, court, clientId, caseNumber, courtType, oppositeParty, oppositeAdvocate, filingDate, nextDate, caseType, notes } = body;

  if (!title || !court || !clientId) {
    return Response.json({ error: "title, court, clientId required" }, { status: 400 });
  }

  const inserted = await db.insert(cases).values({
    userId: session.userId,
    clientId,
    title,
    court,
    caseNumber: caseNumber || null,
    courtType: courtType || null,
    oppositeParty: oppositeParty || null,
    oppositeAdvocate: oppositeAdvocate || null,
    filingDate: filingDate || null,
    nextDate: nextDate || null,
    caseType: caseType || null,
    notes: notes || null,
  }).returning();

  return Response.json({ case: inserted[0] });
}