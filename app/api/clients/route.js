import { db } from "@/lib/db";
import { clients } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const allClients = await db.select().from(clients).where(eq(clients.userId, session.userId));
  return Response.json({ clients: allClients });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, phone, email, address, aadhar, notes } = body;

  if (!name) return Response.json({ error: "name required" }, { status: 400 });

  const inserted = await db.insert(clients).values({
    userId: session.userId,
    name,
    phone: phone || null,
    email: email || null,
    address: address || null,
    aadhar: aadhar || null,
    notes: notes || null,
  }).returning();

  return Response.json({ client: inserted[0] });
}