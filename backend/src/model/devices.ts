import { db } from "../database/connection";
import { devicesTable } from "@app/shared/schema";
import { like, eq } from 'drizzle-orm';
import { Device, DeviceMutationPatchRequest, DeviceMutationRequest } from '@app/shared/models/devices';

export const devices = {
  device: {
    findById: async (id: Device['id']) => db
      .query.devicesTable.findFirst({
        where: eq(devicesTable.id, id)
      }),
    findByName: async (input: string) => db.select().from(devicesTable).where(like(devicesTable.deviceName, `%${input}%`)),
    create: async (device: DeviceMutationRequest) => db.insert(devicesTable).values(device),
    update: async (device: DeviceMutationPatchRequest) => db.update(devicesTable).set(device).where(eq(devicesTable.id, device.id))
  },
  devices: {
    getAll: async () => db.select().from(devicesTable),
  }
};

