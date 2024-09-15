import React from 'react';
import { deviceTypes } from "@app/shared/models/devices.model";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Drawer
} from 'antd';
import { Device } from '@app/shared/models/devices';

export type FormState = Omit<Device , 'id'>

type DeviceFormProps = {
    onSave: (device: FormState) => void;
    isLoading: boolean;
    initialFormState?: Device
}

export const DeviceForm: React.FC<DeviceFormProps> = ({ onSave, isLoading, initialFormState }) => {
    return (
        <Form
          layout="horizontal"
          onFinish={onSave}
          initialValues={ makeInitialState(initialFormState)}
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
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    );
  };

const makeInitialState = (initialState: Partial<Device> |  undefined): FormState => {
    return ({
    deviceName: initialState?.deviceName ?? '',
    batteryStatus: initialState?.batteryStatus ?? 100,
    deviceType: initialState?.deviceType ?? deviceTypes.Tablet,
    ownerName: initialState?.ownerName ?? ''
})
}