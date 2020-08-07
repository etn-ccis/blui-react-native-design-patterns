import React, { ComponentType } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Body1 } from '@pxblue/react-native-components';

type IconToggleProps = {
    IconComponent: ComponentType<{ size: number; color: string }>;
    label: string;
    active: boolean;
    onPress: () => void;
};

const styles = StyleSheet.create({
    iconContainer: {
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const IconToggle: React.FC = (props: IconToggleProps) => {
    const { IconComponent, label, active, onPress } = props;
    const { iconContainer } = styles;
    const color = active ? Colors.blue['500'] : Colors.black['500'];

    return (
        <View style={iconContainer}>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <IconComponent size={32} color={color} />
                </View>
            </TouchableOpacity>
            <Body1 style={{ color: color, textAlign: 'center', marginTop: 8 }}>{label}</Body1>
        </View>
    );
};

export default IconToggle;
