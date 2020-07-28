import React, { ReactElement } from 'react';
import { Header } from '@pxblue/react-native-components';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export const DataListScreen: React.FC = () => {
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

    return (
        <View>
            <Header title={'Data List'} />
            <FlatList
                data={data}
                keyExtractor={(item, index): string => `${index}`}
                renderItem={({ item }): ReactElement => <ListItem title={item.name} rightTitle={`${item.value}`} />}
            />
        </View>
    );
};
