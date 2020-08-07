import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';

type BottomSheetProps = {
    show: boolean;
    dismissBottomSheet: () => void;
    style: any;
    children: ReactNode
};

export const ComplexBottomSheetScreen: React.FC = (props: BottomSheetProps) => {
    const {show, dismissBottomSheet, style, children} = props;
    
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
    }
