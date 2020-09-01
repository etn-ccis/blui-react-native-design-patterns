import React, { CSSProperties, ReactNode } from 'react';
import { Animated } from 'react-native';

export type SnackBarProps = {
    show: boolean;
    style: CSSProperties;
    children: ReactNode;
};

export const SnackBar: React.FC<SnackBarProps> = (props) => {
    const bounceValue = new Animated.Value(props.show ? 0 : 100);

    return props.show ? (
        <Animated.View style={[props.style, { transform: [{ translateY: bounceValue }] }]}>
            {props.children}
        </Animated.View>
    ) : null;
};
