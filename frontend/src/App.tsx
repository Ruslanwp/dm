import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';
import { DeviceList } from './components/DeviceList';
import { AddDevice } from './components/AddDevice';

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
        <DeviceListPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const DeviceListPage = () => {
  const {data, isLoading} = trpc.getDevices.useQuery()

  if(isLoading || data === undefined)return <div>loading</div>

  return (
    <>
    <AddDevice />
    <DeviceList devices={data} />
    </>
  )
}