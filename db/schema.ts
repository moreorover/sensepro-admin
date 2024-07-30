import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

export const customers = pgTable("customers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export type Customer = typeof customers.$inferSelect;
export const customerSchema = createSelectSchema(customers);
export type NewCustomer = typeof customers.$inferInsert;
export const newCustomerSchema = createInsertSchema(customers);

export const customerRelations = relations(customers, ({ many }) => ({
  customerLocations: many(locations, { relationName: "customerId" }),
}));

export const locations = pgTable("locations", {
  id: varchar("id", { length: 255 }).primaryKey(),
  address: varchar("address", { length: 255 }).notNull().unique(),
  customerId: text("customer_id").references(() => customers.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export type Location = typeof locations.$inferSelect;
export type NewLocation = typeof locations.$inferInsert;

export const locationRelations = relations(locations, ({ many }) => ({
  locationSettings: many(settings, { relationName: "locationId" }),
}));

export const settings = pgTable("location_settings", {
  id: varchar("id", { length: 255 }).primaryKey(),

  locationId: text("location_id").references(() => locations.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export type Settings = typeof settings.$inferSelect;
export type NewSettings = typeof settings.$inferInsert;
