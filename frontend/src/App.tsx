import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const Component = () => {
  const {data, isLoading} = trpc.getDeviceByName.useQuery("1")

  if(isLoading)return <div>loading</div>

  return <div>
    {JSON.stringify(data)}
  </div>
}