import { db } from "@/lib/db";
import { cases } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function GET(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const row = await db.select().from(cases).where(and(eq(cases.id, parseInt(id)), eq(cases.userId, session.userId))).limit(1);
  if (!row[0]) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json({ case: row[0] });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const updated = await db.update(cases).set(body).where(and(eq(cases.id, parseInt(id)), eq(cases.userId, session.userId))).returning();

  return Response.json({ case: updated[0] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(cases).where(and(eq(cases.id, parseInt(id)), eq(cases.userId, session.userId)));
  return Response.json({ success: true });
}