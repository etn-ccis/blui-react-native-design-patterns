import React, { useState } from 'react';
import { Header, InfoListItem, EmptyState } from '@brightlayer-ui/react-native-components';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@brightlayer-ui/colors';
import { Button, useTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export type ListItem = {
    id?: number;
    name?: string;
    details?: string;
};

export type ActionListProps = {
    hardcodedData?: ListItem[];
};

const createRandomItem = (): ListItem => {
    const randomInt = parseInt(`${Math.random() * 100}`, 10);
    return { id: randomInt, name: `Item ${randomInt}`, details: `Item ${randomInt} details` };
};

const prepareData = (): ListItem[] => {
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push(createRandomItem());
    }
    return data;
};

export const ActionListScreen: React.FC<ActionListProps> = (props) => {
    const theme: ReactNativePaper.Theme = useTheme();
    const { hardcodedData } = props;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
        },
    });

    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const [data, setData] = useState(hardcodedData ? hardcodedData : prepareData());
    const [isActionsPanelVisible, setIsActionsPanelVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const hideActionsPanel = (): void => {
        setIsActionsPanelVisible(false);
        setSelectedItemIndex(-1);
    };

    const showActionsPanel = (itemIndex: number): void => {
        setIsActionsPanelVisible(true);
        setSelectedItemIndex(itemIndex);
    };

    const addItem = (): void => {
        setData([...data, createRandomItem()]);
    };

    const onDelete = (): void => {
        const updatedData: ListItem[] = [...data];
        updatedData.splice(selectedItemIndex, 1);
        setData(updatedData);
        hideActionsPanel();
    };

    const deleteAll = (): void => {
        setData([]);
    };

    return (
        <View style={styles.container}>
            <Header
                testID="header"
                title={'Action List'}
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
                actionItems={[
                    {
                        icon: <MatIcon name="delete" color={theme.colors.textPalette.onPrimary.main} size={24} />,
                        onPress: deleteAll,
                    },
                    {
                        icon: <MatIcon name="add" color={theme.colors.textPalette.onPrimary.main} size={24} />,
                        onPress: addItem,
                    },
                ]}
            />
            {data.length ? (
                <FlatList
                    data={data}
                    testID={'list'}
                    keyExtractor={(_item, index): string => `${index}`}
                    renderItem={({ item, index }): JSX.Element => (
                        <InfoListItem
                            title={item.name || ''}
                            hidePadding={true}
                            subtitle={item.details}
                            rightComponent={
                                <MatIcon
                                    name="more-vert"
                                    onPress={(): void => showActionsPanel(index)}
                                    color={theme.colors.textPalette.primary}
                                    size={24}
                                />
                            }
                        />
                    )}
                />
            ) : (
                <EmptyState
                    title={'No Items found'}
                    actions={
                        <Button
                            testID="empty-state-add-button"
                            icon={(): JSX.Element => <MatIcon name="add" color={Colors.white[50]} size={24} />}
                            onPress={addItem}
                            mode="contained"
                        >
                            Add An Item
                        </Button>
                    }
                />
            )}
            <SafeAreaView>
                <Modal
                    isVisible={isActionsPanelVisible}
                    backdropOpacity={0.5}
                    onBackdropPress={hideActionsPanel}
                    supportedOrientations={['portrait', 'landscape']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <View style={{ backgroundColor: Colors.white[50] }}>
                        <InfoListItem
                            title={'Remove'}
                            icon={<MatIcon name="cancel" size={24} color={theme.colors.textPalette.primary} />}
                            onPress={onDelete}
                        />
                        <InfoListItem
                            title={'Cancel'}
                            icon={<MatIcon name="clear" size={24} color={theme.colors.textPalette.primary} />}
                            onPress={hideActionsPanel}
                        />
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};
