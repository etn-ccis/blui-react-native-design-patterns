import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Header, wrapIcon, InfoListItem } from '@pxblue/react-native-components';
import { sampleData, Data } from '../data/data';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const InfoIcon = wrapIcon({ IconClass: MaterialIcons, name: 'info' });
const PersonIcon = wrapIcon({ IconClass: MaterialIcons, name: 'person' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export const List: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(sampleData);
    const data = sampleData;

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const onSearch = useEffect((): void => {
        const updatedQuery = query.toLowerCase().trim();
        const updatedResults: Data[] = [];
        data.map((item: Data) => {
            if (
                item.president.toLowerCase().trim().includes(updatedQuery) ||
                item.party.toLowerCase().trim().includes(updatedQuery) ||
                item.tookOffice.toLowerCase().trim().includes(updatedQuery)
            ) {
                updatedResults.push(item);
            }
        });
        setResults(updatedResults);
    }, [query]);

    const onSearchChange = useCallback(
        (string: string): void => {
            setQuery(string);
        },
        [onSearch, query]
    );

    return (
        <View style={styles.container}>
            <Header
                title={'Search Bar'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                searchableConfig={{
                    placeholder: 'Search',
                    autoFocus: true,
                    onChangeText: (q: string): void => {
                        onSearchChange(q);
                    },
                }}
            />
            {results.length === 0 ? (
                <InfoListItem title={'0 Results'} subtitle={'No matching presidents'} IconClass={InfoIcon} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(_, index): string => `${index}`}
                    renderItem={({ item }): JSX.Element => (
                        <InfoListItem
                            title={item.president}
                            subtitle={`${item.party} ${item.tookOffice}`}
                            IconClass={PersonIcon}
                        />
                    )}
                />
            )}
        </View>
    );
};
