import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 32 }).notNull(),
  priceFrom: integer("price_from").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const bookingStatus = pgEnum("booking_status", [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
]);

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  serviceSlug: varchar("service_slug", { length: 64 }).notNull(),
  address: text("address").notNull(),
  preferredDate: varchar("preferred_date", { length: 40 }).notNull(),
  homeSize: varchar("home_size", { length: 40 }).notNull(),
  notes: text("notes"),
  status: bookingStatus("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookingStatusValues = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof bookingStatusValues)[number];
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

export { sql };
