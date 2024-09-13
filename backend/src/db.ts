type Device = { id: string; name: string };

const devices: Device[] = [
  { id: '1', name: 'Device 1' },
  { id: '2', name: 'Device 2' },
  { id: '3', name: 'Device 3' },
];

export const db = {
  device: {
    findMany: async () => devices,
    findByName: async (input: string) => devices.filter((device) => device.name.includes(input)),
  },
};