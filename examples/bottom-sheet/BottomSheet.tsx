import React, { ReactNode, useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as Colors from '@pxblue/colors';
import Modal from 'react-native-modal';

type BottomSheetProps = {
    show?: boolean;
    children?: ReactNode;
};

export const BottomSheetScreen: React.FC = (props: BottomSheetProps) => {
    const { show, children } = props;
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(show ? true : false);

    useEffect((): void => {
        setIsBottomSheetVisible(show ? true : false);
    }, [show]);

    return (
        <SafeAreaView>
            <Modal
                isVisible={isBottomSheetVisible}
                backdropOpacity={0.5}
                supportedOrientations={['portrait', 'landscape']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ backgroundColor: Colors.white[50] }}>{children}</View>
            </Modal>
        </SafeAreaView>
    );
};
