import { db } from "../database/connection";
import { devicesTable } from "@app/shared/schema";
import { ilike, eq } from 'drizzle-orm';
import { Device, DeviceMutationPatchRequest, DeviceMutationRequest } from '@app/shared/models/devices';

export const devices = {
  device: {
    findById: async (id: Device['id']) => db
      .query.devicesTable.findFirst({
        where: eq(devicesTable.id, id)
      }),
    findByName: async (input: string) => db.select().from(devicesTable).where(ilike(devicesTable.deviceName, `%${input}%`)),
    create: async (device: DeviceMutationRequest) => db.insert(devicesTable).values(device),
    update: async (device: DeviceMutationPatchRequest) => db.update(devicesTable).set(device).where(eq(devicesTable.id, device.id))
  },
  devices: {
    getAllWithFilter: async (filter: string) => {
      const query = db.select().from(devicesTable)
      if (filter.trim().length > 0) {
        return query.where(ilike(devicesTable.deviceName, `%${filter}%`))
      }
      return query
    }
  }
};

