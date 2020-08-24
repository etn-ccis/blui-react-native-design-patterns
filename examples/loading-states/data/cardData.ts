import { MaterialIcons } from '@expo/vector-icons';
import { wrapIcon } from '@pxblue/react-native-components';
import { ComponentType } from 'react';
import { WrapIconProps } from '@pxblue/react-native-components/core/icon-wrapper/icon-wrapper';

const SunnyIcon = wrapIcon({ IconClass: MaterialIcons, name: 'wb-sunny' });
const BrightnessHighIcon = wrapIcon({ IconClass: MaterialIcons, name: 'brightness-high' });
const IncandescentIcon = wrapIcon({ IconClass: MaterialIcons, name: 'wb-incandescent' });

export type ChannelItem = {
  label: string;
  value: number;
  units: string;
  icon: ComponentType<WrapIconProps>;
}
export type DeviceData = {
  heroValue: number;
  loadValue: number;
  battery: number;
  channels: ChannelItem[];
}

export type Device = {
  name?: string;
  data?: DeviceData;
}

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
          icon: SunnyIcon,
        },
        {
          label: 'Output Voltage',
          value: 480,
          units: 'V',
          icon: BrightnessHighIcon,
        },
        {
          label: 'Output Current',
          value: 15,
          units: 'A',
          icon: IncandescentIcon,
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
          icon: SunnyIcon,
        },
        {
          label: 'Output Voltage',
          value: 480,
          units: 'V',
          icon: BrightnessHighIcon,
        },
        {
          label: 'Output Current',
          value: 15,
          units: 'A',
          icon: IncandescentIcon,
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
          icon: SunnyIcon,
        },
        {
          label: 'Output Voltage',
          value: 492,
          units: 'V',
          icon: BrightnessHighIcon,
        },
        {
          label: 'Output Current',
          value: 14.6,
          units: 'A',
          icon: IncandescentIcon,
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
          icon: SunnyIcon,
        },
        {
          label: 'Output Voltage',
          value: 680,
          units: 'V',
          icon: BrightnessHighIcon,
        },
        {
          label: 'Output Current',
          value: 13,
          units: 'A',
          icon: IncandescentIcon,
        },
      ],
    },
  },
];

export const emptyData = [{}, {}, {}, {}];
