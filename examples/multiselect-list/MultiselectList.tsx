import React from 'react';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@pxblue/colors';
import { DataList } from './components/DataList';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export const MultiselectListScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View style={styles.container}>
            <Header
                title={'Multiselect List'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
            />
            <DataList />
        </View>
    );
};