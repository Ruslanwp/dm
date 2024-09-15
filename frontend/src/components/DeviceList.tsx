import { Device } from '@app/shared/models/devices';
import { Table, TableProps } from 'antd';
import { FunctionComponent } from 'react';
import { EditDevice } from './EditDevice';

type DeviceListProps = {
    devices: Device[];
};
    const columns : TableProps<Device>['columns'] = [
        {
            title: 'Device Name',
            dataIndex: 'deviceName',
            key: 'deviceName',
            sorter: (a, b) => a.deviceName.localeCompare(b.deviceName)
        },
        {
            title: 'Device Type',
            dataIndex: 'deviceType',
            key: 'deviceType',
            sorter: (a, b) => a.deviceType.localeCompare(b.deviceType)
        },
        {
            title: 'Owner',
            dataIndex: 'ownerName',
            key: 'ownerName',
            sorter: (a, b) => a.ownerName.localeCompare(b.ownerName)
        },
        {
            title: 'Battery Status',
            dataIndex: 'batteryStatus',
            key: 'batteryStatus',
            sorter: (a, b) => a.batteryStatus - b.batteryStatus,
        },
        {
            title: 'Edit Action',
            dataIndex: 'editAction',
            key: 'editAction',
            render(_, device) {
                return <EditDevice device={device} />
            },
        }
    ]

export const DeviceList: FunctionComponent<DeviceListProps> = ({
    devices
}) => {
    return <Table dataSource={devices} pagination={false} columns={columns} />
}
