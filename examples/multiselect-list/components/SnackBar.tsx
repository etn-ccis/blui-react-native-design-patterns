import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

export type SnackBarProps = ViewProps & {
    show: boolean;
};

export const SnackBar: React.FC<SnackBarProps> = (props) => {
    const { show } = props;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const transformStyle = {
        transform: [
            {
                translateY: slideAnim,
            },
        ],
    };

    const slideIn = (): void => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = (): void => {
        Animated.timing(slideAnim, {
            toValue: 100,
            duration: 0,
            useNativeDriver: true,
        }).start();
    };

    useEffect((): void => {
        if (show) {
            slideIn();
        } else {
            slideOut();
        }
    }, [show]);

    return props.show ? <Animated.View style={[props.style, transformStyle]}>{props.children}</Animated.View> : null;
};
