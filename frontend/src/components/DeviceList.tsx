import { List, Table, TableProps } from 'antd';
import { FunctionComponent } from 'react';
import { Device } from '@app/shared/devices/types';

type DeviceListProps = {
    devices: Device[];
};

const columns: TableProps<Device>["columns"] = [
    {
        title: 'Device Name',
        dataIndex: 'deviceName',
        key: 'deviceName',
    },
    {
        title: 'Device Type',
        dataIndex: 'deviceType',
        key: 'deviceType'
    },
    {
        title: 'Owner',
        dataIndex: 'ownerName',
        key: 'ownerName',
    },
    {
        title: 'Battery Status',
        dataIndex: 'batteryStatus',
        key: 'batteryStatus',
    }
];  

export const DeviceList: FunctionComponent<DeviceListProps> = ({
    devices
}) => {
    return (
        <Table dataSource={devices} pagination={false} columns={columns} />
    )
}