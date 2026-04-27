import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return Response.json({ authenticated: false });
  const session = await getSession(token);
  if (!session) return Response.json({ authenticated: false });
  return Response.json({ authenticated: true, user: session });
}