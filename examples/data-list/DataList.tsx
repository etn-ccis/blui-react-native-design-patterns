import React, { ReactElement } from 'react';
import { Header, InfoListItem } from '@pxblue/react-native-components';
import { View, FlatList, Text } from 'react-native';

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
                renderItem={({ item }): ReactElement => (
                    <InfoListItem title={item.name} hidePadding={true} rightComponent={<Text>{item.value}</Text>} />
                )}
            />
        </View>
    );
};
// use pxb info list item ^
