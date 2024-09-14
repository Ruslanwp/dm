import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const devicesTable = pgTable('devices', {
    id: serial('id').primaryKey(),
    deviceName: text('device_name').notNull(),
    deviceType: varchar('device_type', { length: 256 }).notNull(),
    ownerName: text('owner_name').notNull(),
    batteryStatus: integer('battery_status').notNull()
  });
