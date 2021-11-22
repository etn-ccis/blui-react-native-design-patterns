import React, { ReactElement } from 'react';
import { Header, InfoListItem } from '@brightlayer-ui/react-native-components';
import { View, FlatList, Text } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

export const DataListScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const theme = useTheme();

    const data = [
        {
            name: 'George Washington',
            value: 1789,
        },
        {
            name: 'John Adams',
            value: 1796,
        },
        {
            name: 'Thomas Jefferson',
            value: 1800,
        },
        {
            name: 'James Madison',
            value: 1808,
        },
        {
            name: 'James Monroe',
            value: 1812,
        },
    ];

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View>
            <Header
                title={'Data List'}
                icon={
                    <MatIcon
                        name="menu"
                        color={theme.colors.textPalette?.onPrimary?.main || Colors.white[50]}
                        size={24}
                    />
                }
                onIconPress={(): void => {
                    toggleMenu();
                }}
            />
            <FlatList
                data={data}
                keyExtractor={(item, index): string => `${index}`}
                renderItem={({ item }): ReactElement => (
                    <InfoListItem title={item.name} hidePadding={true} rightComponent={<Text>{item.value}</Text>} />
                )}
            />
        </View>
    );
};
