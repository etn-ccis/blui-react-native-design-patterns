import React from 'react';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@pxblue/colors';
import { DataList } from './components/DataList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ListItem } from './utilities';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export type MultiselectListProps = {
    hardcodedData?: ListItem[];
};

export const MultiselectListScreen: React.FC<MultiselectListProps> = (props) => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const { hardcodedData } = props;

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
            <DataList hardcodedData={hardcodedData} />
        </View>
    );
};