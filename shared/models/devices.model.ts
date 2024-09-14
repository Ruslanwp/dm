import { z } from 'zod';
import { devicesTable } from '../schema';
import { createSelectSchema } from 'drizzle-zod';

export const selectSchema = createSelectSchema(devicesTable)
export  const deviceTypes = selectSchema.shape.deviceType.Values;