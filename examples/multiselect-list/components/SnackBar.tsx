import React from 'react';
import { Animated, ViewProps } from 'react-native';

export type SnackBarProps = ViewProps & {
    show: boolean;
};

export const SnackBar: React.FC<SnackBarProps> = (props) => {
    const bounceValue = props.show ? 0 : 100;

    return props.show ? (
        <Animated.View style={[props.style, { transform: [{ translateY: bounceValue }] }]}>
            {props.children}
        </Animated.View>
    ) : null;
};
