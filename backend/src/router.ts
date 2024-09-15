import { z } from 'zod';
import { trpc } from './trpc' 
import { devices } from './model/devices';
import { createSchema, editSchema } from '@app/shared/models/devices.model';

export const appRouter = trpc.router({
  getDevicesWithFilter: trpc.procedure.input(z.string()).query(async (opts) => {
    return await devices.devices.getAllWithFilter(opts.input)
  }),
  getDeviceByName: trpc.procedure
    .input(z.string().min(1))
    .query(async (opts) => {
    return await devices.device.findByName(opts.input);
  }),
  createDevice: trpc.procedure
    .input(createSchema)
    .mutation(async (opts) => {
    return await devices.device.create(opts.input);
  }),
  editDevice: trpc.procedure
    .input(editSchema)
    .mutation(async (opts) => {
      return await devices.device.update(opts.input);
    }),
});

export type AppRouter = typeof appRouter;