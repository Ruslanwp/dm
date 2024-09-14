import { db } from "../database/connection";
import { devicesTable } from "@app/shared/schema";
import { like, eq } from 'drizzle-orm';
import { Device } from '@app/shared/models/devices';

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

