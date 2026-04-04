import { sql } from "drizzle-orm";
import { integer, text, real, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  status: text("status").default("trial"),
  expiryDate: text("expiry_date"),
  reminderSent: integer("reminder_sent").default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const googleUsers = sqliteTable("google_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  googleId: text("google_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  picture: text("picture"),
  role: text("role").default("admin"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  aadhar: text("aadhar"),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const cases = sqliteTable("cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  clientId: integer("client_id").notNull(),
  caseNumber: text("case_number"),
  title: text("title").notNull(),
  court: text("court").notNull(),
  courtType: text("court_type"),
  oppositeParty: text("opposite_party"),
  oppositeAdvocate: text("opposite_advocate"),
  filingDate: text("filing_date"),
  nextDate: text("next_date"),
  status: text("status").default("active"),
  caseType: text("case_type"),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const hearings = sqliteTable("hearings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caseId: integer("case_id").notNull(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(),
  nextDate: text("next_date"),
  notes: text("notes"),
  outcome: text("outcome"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caseId: integer("case_id").notNull(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type"),
  url: text("url"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const fees = sqliteTable("fees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caseId: integer("case_id").notNull(),
  clientId: integer("client_id").notNull(),
  userId: integer("user_id").notNull(),
  amount: real("amount").notNull(),
  paid: real("paid").default(0),
  due: real("due").default(0),
  paymentDate: text("payment_date"),
  mode: text("mode").default("cash"),
  note: text("note"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});