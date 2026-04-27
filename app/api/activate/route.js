import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";

const raw = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function POST(request) {
  const authHeader = request.headers.get("Authorization");
  const body = await request.json();
  const secret = process.env.HUB_SECRET;

  if (authHeader !== `Bearer ${secret}` && body.secret !== secret) {
    return Response.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  const { email, name } = body;
  if (!email) return Response.json({ success: false, error: "email required" }, { status: 400 });

  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);

  const existing = await db.select().from(users).where(eq(users.email, email));

  if (existing.length === 0) {
    await raw.execute({
      sql: "INSERT INTO pre_activations (email) VALUES (?) ON CONFLICT DO NOTHING",
      args: [email],
    });
  } else {
    await db.update(users).set({
      status: "active",
      expiryDate: expiry.toISOString(),
      reminderSent: 0,
    }).where(eq(users.email, email));
  }

  return Response.json({ success: true, email, expiryDate: expiry.toISOString() });
}