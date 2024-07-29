import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  })
);
