import { z } from 'zod';
import { trpc } from './trpc' 
import { devices } from './model/devices';

export const appRouter = trpc.router({
  getDevices: trpc.procedure.query(async () => {
    return await devices.devices.getAll()
  }),
  getDeviceByName: trpc.procedure
    .input(z.string().min(1))
    .query(async (opts) => {
    return await devices.device.findByName(opts.input);
  }),
});

export type AppRouter = typeof appRouter;