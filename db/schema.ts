import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
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
  address: varchar("address", { length: 255 }).notNull(),
  customerId: text("customer_id").references(() => customers.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export type Location = typeof locations.$inferSelect;
export const locationSchema = createSelectSchema(locations);
export type NewLocation = typeof locations.$inferInsert;
export const newLocationSchema = createInsertSchema(locations);

export const locationRelations = relations(locations, ({ many }) => ({
  locationSettings: many(settings, { relationName: "locationId" }),
  locationDevices: many(devices, { relationName: "locationId" }),
}));

export const deviceTypes = pgTable("device_types", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const deviceTypeSchema = createSelectSchema(deviceTypes);
export const newDeviceTypeSchema = createInsertSchema(deviceTypes);

export const deviceTypeRelations = relations(deviceTypes, ({ many }) => ({
  devices: many(devices, { relationName: "deviceTypeId" }),
}));

export const groups = pgTable("groups", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),

  locationId: text("location_id").references(() => locations.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const groupSchema = createSelectSchema(groups);
export const newGroupSchema = createInsertSchema(groups);

export const groupRelations = relations(groups, ({ many, one }) => ({
  devices: many(devices),
  location: one(locations, {
    fields: [groups.locationId],
    references: [locations.id],
  }),
}));

export const devices = pgTable("location_devices", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().default(""),
  mac: varchar("mac", { length: 255 }).notNull().default(""),
  ip: varchar("ip", { length: 100 }).notNull().default(""),
  pin: integer("pin").notNull().default(0),

  deviceTypeId: text("device_type_id").references(() => deviceTypes.id, {
    onDelete: "set null",
  }),

  groupId: text("group_id").references(() => groups.id, {
    onDelete: "set null",
  }),

  locationId: text("location_id").references(() => locations.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const deviceSchema = createSelectSchema(devices);
export const newDeviceSchema = createInsertSchema(devices);

export const devicesRelations = relations(devices, ({ one }) => ({
  deviceType: one(deviceTypes, {
    fields: [devices.deviceTypeId],
    references: [deviceTypes.id],
  }),
  group: one(groups, {
    fields: [devices.groupId],
    references: [groups.id],
  }),
  location: one(locations, {
    fields: [devices.locationId],
    references: [locations.id],
  }),
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

export const settingsRelations = relations(settings, ({ one }) => ({
  location: one(locations, {
    fields: [settings.locationId],
    references: [locations.id],
  }),
}));

export type Settings = typeof settings.$inferSelect;
export const settingchema = createSelectSchema(settings);
export type NewSettings = typeof settings.$inferInsert;
export const newSettingSchema = createInsertSchema(settings);
