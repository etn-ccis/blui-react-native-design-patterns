import React from 'react';
import { Header } from '@brightlayer-ui/react-native-components';
import bg from '../../../assets/images/farm.jpg';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';

export const CollapsibleAppbarScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const theme = useTheme();

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <Header
            expandable
            startExpanded
            backgroundImage={bg}
            title={'Collapsible Appbar'}
            subtitle={'Tap to collapse/expand'}
            info={`I'm hidden when collapsed`}
            icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
            onIconPress={(): void => {
                toggleMenu();
            }}
        />
    );
};
