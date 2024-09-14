import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { db } from "../database/connection";
import { devicesTable } from "../database/schema";
import { like, eq } from 'drizzle-orm';
import z from "zod";

const selectSchema = createSelectSchema(devicesTable)

type Device = z.infer<typeof selectSchema>

export const devices = {
  device: {
    findById: async (id: Device['id']) => db
      .query.devicesTable.findFirst({
        where: eq(devicesTable.id, id)
      }),
    findByName: async (input: string) => db.select().from(devicesTable).where(like(devicesTable.deviceName, `%${input}%`)),
  },
  devices: {
    getAll: async () => db.select().from(devicesTable),
  }
};

