import { z } from 'zod';
import { devicesTable } from '../schema';
import { createSelectSchema } from 'drizzle-zod';

export const selectSchema = createSelectSchema(devicesTable)

export const createSchema = createSelectSchema(devicesTable).omit({
    id: true
})

export  const deviceTypes = selectSchema.shape.deviceType.Values;