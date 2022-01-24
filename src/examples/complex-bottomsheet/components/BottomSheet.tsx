import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';
import { ViewStyle } from 'react-native';

type BottomSheetProps = {
    show: boolean;
    dismissBottomSheet: () => void;
    style: ViewStyle;
    children: ReactNode;
};

export const ComplexBottomSheetScreen: React.FC = (props: BottomSheetProps) => {
    const { show, dismissBottomSheet, style, children } = props;

    return (
        <Modal
            isVisible={show}
            onBackdropPress={dismissBottomSheet}
            onBackButtonPress={dismissBottomSheet}
            style={style}
        >
            {children}
        </Modal>
    );
};
