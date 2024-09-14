import React from 'react';
import { deviceTypes } from "@app/shared/models/devices.model";
import { PlusOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Drawer
} from 'antd';
import { Device } from '@app/shared/models/devices';
import { trpc } from '../utils/trpc';

export const AddDevice: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onFormClose = () => {
    setOpen(false)
  }
  
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
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
        <DeviceForm onFormClose={onFormClose}/>
      </Drawer>
    </>
  );
};

type FormState = Pick<Device, 'batteryStatus' | 'deviceType' | 'deviceName' | 'ownerName'>;

type DeviceFormProps = {
  onFormClose: () => void
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onFormClose }) => {
  const trpcApi = trpc.useUtils()

  const createDeviceMutation = trpc.createDevice.useMutation({
    onSuccess: () => {
      trpcApi.getDevices.invalidate()
    }
  })
  const onFormChange = ({ deviceName, deviceType, batteryStatus }: FormState) => {
    console.log({ deviceName, deviceType, batteryStatus })
  };

  const onFinish = async (values: FormState) => {
    await createDeviceMutation.mutateAsync(values)
    onFormClose()
  }

  return (
    <>
      <Form
        onValuesChange={onFormChange}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={
          {
            deviceName: '',
            ownerName: '',
            deviceType: deviceTypes.Tablet,
            batteryStatus: 100,
          } satisfies FormState
        }
      >
        <Form.Item label="Owner Name" name='ownerName' rules={[{ required: true, message: 'Please enter owner name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Device Name" name='deviceName' rules={[{ required: true, message: 'Please enter device name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Device Type" name='deviceType' rules={[{ required: true, message: 'Please select device type!' }]}>
          <Select>
            {Object.values(deviceTypes).map((deviceType) => (
              <Select.Option key={deviceType} value={deviceType}>{deviceType}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Battery status" name='batteryStatus' rules={[{ required: true, message: 'Please set a number between 1 and 100' }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={createDeviceMutation.isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};