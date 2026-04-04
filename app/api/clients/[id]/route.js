import { db } from "@/lib/db";
import { clients } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function GET(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const row = await db.select().from(clients).where(and(eq(clients.id, parseInt(id)), eq(clients.userId, session.userId))).limit(1);
  if (!row[0]) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json({ client: row[0] });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const updated = await db.update(clients).set(body).where(and(eq(clients.id, parseInt(id)), eq(clients.userId, session.userId))).returning();

  return Response.json({ client: updated[0] });
}