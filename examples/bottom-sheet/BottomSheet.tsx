import React, { useState, useCallback } from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';
import * as Colors from '@pxblue/colors'

type BottomSheetProps = {
    show: boolean;
    style: any;
    children?: any;
}

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: Colors.white[100],
        flex: 1,
    }
});

export const BottomSheetScreen: React.FC = (props: BottomSheetProps) => {
    const { show, style, children } = props;
    const [bounceValue, setBounceValue] = useState(new Animated.Value(show ? 0 : 200))

    useCallback((prevProps: BottomSheetProps) => {
        if (show !== prevProps.show) {
            const newBounceValue = show ? 0 : 200;
            Animated.timing(
                newBounceValue,
                {
                    toValue: newBounceValue,
                    duration: 200,
                }
            ).start();
        }
    }, [show]);

    return (
        <Animated.View
            style={[style,
                { transform: [{ translateY: bounceValue }] }]}
        >
            <SafeAreaView style={styles.safeContainer}>
                {children}
            </SafeAreaView>
        </Animated.View>
    );
};
