import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@app/backend/src/router';

export const trpc = createTRPCReact<AppRouter>();
