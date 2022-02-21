import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';
import { Hero } from '@brightlayer-ui/react-native-components';

type IconToggleProps = {
    icon: JSX.Element;
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

export const IconToggle: React.FC<IconToggleProps> = (props) => {
    const { icon, label, active, onPress } = props;
    const { iconContainer } = styles;
    const color = active ? Colors.blue['500'] : Colors.black['500'];

    return (
        <View style={iconContainer}>
            <Hero icon={icon} style={{ maxWidth: 96 }} label={label} iconColor={color} onPress={onPress}></Hero>
        </View>
    );
};
