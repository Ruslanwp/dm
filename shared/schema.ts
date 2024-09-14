import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const deviceTypeEnum = pgEnum('device_type', ['Smartphone', 'Tablet', 'Camera'])

export const devicesTable = pgTable('devices', {
    id: serial('id').primaryKey(),
    deviceName: text('device_name').notNull(),
    deviceType: deviceTypeEnum('device_type').notNull(),
    ownerName: text('owner_name').notNull(),
    batteryStatus: integer('battery_status').notNull()
  });
