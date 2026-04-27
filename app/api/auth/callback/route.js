import { googleClient as google } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@libsql/client";

const DEVELOPER_EMAIL = "prasad.kamta@gmail.com";

const raw = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function redirectWithCookie(request, path, token) {
  const response = NextResponse.redirect(new URL(path, request.url));
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  response.cookies.set("role", "owner", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const codeVerifier = cookieStore.get("code_verifier")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const googleRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const googleUser = await googleRes.json();

    if (!googleUser.email) {
      return NextResponse.redirect(new URL("/login?error=failed", request.url));
    }

    let existing = await db.select().from(users).where(eq(users.email, googleUser.email));

    if (existing.length === 0) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);

      await db.insert(users).values({
        email: googleUser.email,
        name: googleUser.name || "",
        status: "trial",
        expiryDate: expiry.toISOString(),
        reminderSent: 0,
      });

      const pre = await raw.execute({
        sql: "SELECT email FROM pre_activations WHERE email = ?",
        args: [googleUser.email],
      });

      if (pre.rows.length > 0) {
        const activeExpiry = new Date();
        activeExpiry.setFullYear(activeExpiry.getFullYear() + 1);
        await db.update(users).set({
          status: "active",
          expiryDate: activeExpiry.toISOString(),
          reminderSent: 0,
        }).where(eq(users.email, googleUser.email));
        await raw.execute({
          sql: "DELETE FROM pre_activations WHERE email = ?",
          args: [googleUser.email],
        });
      }

      existing = await db.select().from(users).where(eq(users.email, googleUser.email));
    } else {
      const pre = await raw.execute({
        sql: "SELECT email FROM pre_activations WHERE email = ?",
        args: [googleUser.email],
      });

      if (pre.rows.length > 0) {
        const activeExpiry = new Date();
        activeExpiry.setFullYear(activeExpiry.getFullYear() + 1);
        await db.update(users).set({
          status: "active",
          expiryDate: activeExpiry.toISOString(),
          reminderSent: 0,
        }).where(eq(users.email, googleUser.email));
        await raw.execute({
          sql: "DELETE FROM pre_activations WHERE email = ?",
          args: [googleUser.email],
        });
        existing = await db.select().from(users).where(eq(users.email, googleUser.email));
      }
    }

    const user = existing[0];

    const token = await createSession(
      user.id,
      user.email,
      Buffer.from(user.name || "").toString("base64"),
      user.status,
      user.expiryDate
    );

    if (user.email === DEVELOPER_EMAIL) {
      return redirectWithCookie(request, "/dashboard", token);
    }

    if (user.status === "active" && user.expiryDate && new Date(user.expiryDate) > new Date()) {
      return redirectWithCookie(request, "/dashboard", token);
    }

    if (user.status === "trial" && user.expiryDate && new Date(user.expiryDate) > new Date()) {
      return redirectWithCookie(request, "/dashboard", token);
    }

    return redirectWithCookie(request, "/expired", token);

  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/login?error=failed", request.url));
  }
}