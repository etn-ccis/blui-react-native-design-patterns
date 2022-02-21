export type ChannelItem = {
    label: string;
    value: number;
    units: string;
    icon: string;
};
export type DeviceData = {
    heroValue: number;
    loadValue: number;
    battery: number;
    channels: ChannelItem[];
};

export type Device = {
    name?: string;
    data?: DeviceData;
};

export const cardData: Device[] = [
    {
        name: 'device 1',
        data: {
            heroValue: 85,
            loadValue: 20,
            battery: 12,
            channels: [
                {
                    label: 'Temperature',
                    value: 68,
                    units: '°F',
                    icon: 'wb-sunny',
                },
                {
                    label: 'Output Voltage',
                    value: 480,
                    units: 'V',
                    icon: 'brightness-high',
                },
                {
                    label: 'Output Current',
                    value: 15,
                    units: 'A',
                    icon: 'wb-incandescent',
                },
            ],
        },
    },
    {
        name: 'device 2',
        data: {
            heroValue: 100,
            loadValue: 33,
            battery: 52,
            channels: [
                {
                    label: 'Temperature',
                    value: 68,
                    units: '°F',
                    icon: 'wb-sunny',
                },
                {
                    label: 'Output Voltage',
                    value: 480,
                    units: 'V',
                    icon: 'brightness-high',
                },
                {
                    label: 'Output Current',
                    value: 15,
                    units: 'A',
                    icon: 'wb-incandescent',
                },
            ],
        },
    },
    {
        name: 'device 3',
        data: {
            heroValue: 72,
            loadValue: 98,
            battery: 98,
            channels: [
                {
                    label: 'Temperature',
                    value: 69,
                    units: '°F',
                    icon: 'wb-sunny',
                },
                {
                    label: 'Output Voltage',
                    value: 492,
                    units: 'V',
                    icon: 'brightness-high',
                },
                {
                    label: 'Output Current',
                    value: 14.6,
                    units: 'A',
                    icon: 'wb-incandescent',
                },
            ],
        },
    },
    {
        name: 'device 4',
        data: {
            heroValue: 0,
            loadValue: 20,
            battery: 12,
            channels: [
                {
                    label: 'Temperature',
                    value: 50,
                    units: '°F',
                    icon: 'wb-sunny',
                },
                {
                    label: 'Output Voltage',
                    value: 680,
                    units: 'V',
                    icon: 'brightness-high',
                },
                {
                    label: 'Output Current',
                    value: 13,
                    units: 'A',
                    icon: 'wb-incandescent',
                },
            ],
        },
    },
];

export const emptyData = [{}, {}, {}, {}];
