import React, { useState } from 'react';
import { deviceTypes } from "@app/shared/models/devices.model";
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Drawer
} from 'antd';

export const AddDevice: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);

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
        extra={
            <Button type="primary">
                Create Device
            </Button>
        }
      >
        <DeviceForm />
      </Drawer>
    </>
  );
};

const DeviceForm: React.FC = () => {
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Device Name">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            {Object.values(deviceTypes).map((deviceType) => (
              <Select.Option value={deviceType}>{deviceType}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};