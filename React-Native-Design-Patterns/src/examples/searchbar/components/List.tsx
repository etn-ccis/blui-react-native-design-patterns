import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';
import { Header, InfoListItem, EmptyState } from '@brightlayer-ui/react-native-components';
import { sampleData, Data } from '../data/data';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export const List: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const theme = useTheme();
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
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
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
                <EmptyState
                    title={'0 results'}
                    icon={<MatIcon name="error" />}
                    description={'No matching presidents'}
                />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(_, index): string => `${index}`}
                    renderItem={({ item }): JSX.Element => (
                        <InfoListItem
                            title={item.president}
                            subtitle={item.party}
                            info={item.tookOffice}
                            icon={<MatIcon name="person" />}
                        />
                    )}
                />
            )}
        </View>
    );
};
