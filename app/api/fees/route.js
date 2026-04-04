import { db } from "@/lib/db";
import { fees } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function GET(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get("caseId");

  const query = caseId
    ? await db.select().from(fees).where(eq(fees.caseId, parseInt(caseId)))
    : await db.select().from(fees).where(eq(fees.userId, session.userId));

  return Response.json({ fees: query });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { caseId, clientId, amount, paid, due, mode, paymentDate, note } = body;

  if (!caseId || !amount) return Response.json({ error: "caseId and amount required" }, { status: 400 });

  const inserted = await db.insert(fees).values({
    caseId,
    clientId,
    userId: session.userId,
    amount,
    paid: paid || 0,
    due: due || amount,
    mode: mode || "cash",
    paymentDate: paymentDate || null,
    note: note || null,
  }).returning();

  return Response.json({ fee: inserted[0] });
}