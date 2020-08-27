import { ComponentType } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { wrapIcon } from '@pxblue/react-native-components';
import { WrapIconProps } from '@pxblue/react-native-components/core/icon-wrapper/icon-wrapper';
import { red, yellow, green } from '@pxblue/colors';

const AGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-a' });
const BGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-b' });
const CGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-c' });

export const getIcon = (value: number): string => {
    if (value >= 90) return 'A';
    else if (value >= 80) return 'B';
    return 'C';
};
export const getColor = (value: number): string => {
    if (value < 25) {
        return red[500];
    }
    if (value < 75) {
        return yellow[500];
    }
    return green[500];
};

export const getGradeColor = (value: number): string => {
    if (value >= 90) return green[500];
    else if (value >= 80) return yellow[500];
    return red[500];
};

export const getGradeIcon = (letter: string): ComponentType<WrapIconProps> => {
    switch (letter) {
        case 'A':
            return AGradeIcon;
        case 'B':
            return BGradeIcon;
        case 'C':
            return CGradeIcon;
        default:
            return AGradeIcon;
    }
};
