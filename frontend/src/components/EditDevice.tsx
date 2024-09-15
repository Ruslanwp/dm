import React from 'react';
import {
  Button,
  Drawer
} from 'antd';
import { trpc } from '../utils/trpc';
import { DeviceForm, FormState } from './DeviceForm';
import { Device } from '@app/shared/models/devices';

type EditDeviceProps = {
  device: Device
}

export const EditDevice: React.FC<EditDeviceProps> = ({
    device
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const trpcApi = trpc.useUtils()

  const handleMutation = trpc.editDevice.useMutation({
    onSuccess: () => {
      trpcApi.getDevices.invalidate()
      setOpen(false)
    }
  })

  const onSave = async (values: FormState) => {
    await handleMutation.mutateAsync({
      ...values,
      id: device.id
    })
  }
  
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit Device
      </Button>
      <Drawer
        closable
        destroyOnClose
        title={<p>Edit Device</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        width={'90vw'}
      >
        <DeviceForm initialFormState={device} onSave={onSave} isLoading={handleMutation.isLoading}/>
      </Drawer>
    </>
  );
};

