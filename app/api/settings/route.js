import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.select().from(settings).where(eq(settings.userId, session.userId)).limit(1);
  return NextResponse.json({ settings: rows[0] || null });
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { lawyerName, firmName, phone, email, address, barCouncilNumber, enrollmentNumber, highCourt } = body;

  const existing = await db.select().from(settings).where(eq(settings.userId, session.userId)).limit(1);

  if (existing.length > 0) {
    await db.update(settings).set({
      lawyerName, firmName, phone, email, address, barCouncilNumber, enrollmentNumber, highCourt,
      updatedAt: new Date().toISOString(),
    }).where(eq(settings.userId, session.userId));
  } else {
    await db.insert(settings).values({
      userId: session.userId,
      lawyerName, firmName, phone, email, address, barCouncilNumber, enrollmentNumber, highCourt,
    });
  }

  return NextResponse.json({ success: true });
}