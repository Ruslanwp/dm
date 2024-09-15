import React from 'react';
import {
  Button,
  Drawer
} from 'antd';
import { trpc } from '../utils/trpc';
import { DeviceForm, FormState } from './DeviceForm';

export const AddDevice: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const trpcApi = trpc.useUtils()

  const handleMutation = trpc.createDevice.useMutation({
    onSuccess: () => {
      trpcApi.getDevicesWithFilter.invalidate()
      setOpen(false)
    }
  })

  const onSave = async (device: FormState) => {
    await handleMutation.mutateAsync(device)
  }
  
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} size='large'>
        Add Device
      </Button>
      <Drawer
        closable
        destroyOnClose
        title={<p>Add Device</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        width={'90vw'}
      >
        <DeviceForm onSave={onSave} isLoading={handleMutation.isLoading}/>
      </Drawer>
    </>
  );
};
