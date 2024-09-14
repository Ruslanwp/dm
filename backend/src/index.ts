import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from './router';
import cors from 'cors';
import { createContext } from './trpc';
import { initEnvConfig } from './utils/env-config';

initEnvConfig();

const app = express();

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  app.use(cors())
}

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
});