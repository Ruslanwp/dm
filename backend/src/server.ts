import { initTRPC } from '@trpc/server';
import { db } from './db';
import { z } from 'zod';

export const t = initTRPC.create();
export const appRouter = t.router({
  getDevices: t.procedure.query(() => {
    return db.device.findMany();
  }),
  getDeviceByName: t.procedure.input(z.string()).query((opts) => {
    return db.device.findByName(opts.input);
  }),
});

export type AppRouter = typeof appRouter;