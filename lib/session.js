import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function createSession(userId, email, name, status, expiryDate) {
  return await new SignJWT({ userId, email, name, status, expiryDate: expiryDate?.toISOString?.() ?? expiryDate })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getSession(token) {
  try {
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("session")?.value;
    }
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}