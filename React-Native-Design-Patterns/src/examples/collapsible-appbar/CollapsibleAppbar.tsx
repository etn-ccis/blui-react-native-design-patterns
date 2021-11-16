import React from 'react';
import { Header, wrapIcon } from '@brightlayer-ui/react-native-components';
import bg from '../../assets/images/farm.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

export const CollapsibleAppbarScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();

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
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    toggleMenu();
                },
            }}
        />
    );
};
