import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';
import { GetProps, Input} from 'antd';
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
  const [search, setSearch] = useState<string>('')
  const {data, isLoading} = trpc.getDevicesWithFilter.useQuery(search)
  const onSearch: SearchProps['onSearch'] = (value) => setSearch(value);

  return (
    <>
    <AddDevice />
    <Search onSearch={onSearch} />
    <DeviceList isLoading={isLoading || data === undefined} devices={data ?? []} />
    </>
  )
}

type SearchProps = GetProps<typeof Input.Search>;

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    return <Input.Search style={{ padding: '10px 0'}} placeholder="enter device name to search" onSearch={onSearch} enterButton />
}
