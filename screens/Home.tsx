import React from 'react';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

export const Home: React.FC = () => {
    const navigation = useNavigation();

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <Header
            title={'Design Pattern Examples'}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    toggleMenu();
                },
            }}
        />
    );
};
