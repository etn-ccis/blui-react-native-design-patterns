import React, { useState } from 'react';
import { Header, wrapIcon, InfoListItem, EmptyState } from '@pxblue/react-native-components';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@pxblue/colors';
import { Button, useTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const DeleteIcon = wrapIcon({ IconClass: MaterialIcons, name: 'delete' });
const AddIcon = wrapIcon({ IconClass: MaterialIcons, name: 'add' });
const CancelIcon = wrapIcon({ IconClass: MaterialIcons, name: 'cancel' });
const ClearIcon = wrapIcon({ IconClass: MaterialIcons, name: 'clear' });

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
        actionItem: {
            minHeight: 52,
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
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[
                    { icon: DeleteIcon, onPress: deleteAll },
                    { icon: AddIcon, onPress: addItem },
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
                                <MaterialIcons
                                    name="more-vert"
                                    onPress={(): void => showActionsPanel(index)}
                                    color={Colors.black[500]}
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
                            icon={(): JSX.Element => <MaterialIcons name="add" color={Colors.white[50]} size={24} />}
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
                            style={styles.actionItem}
                            title={'Remove'}
                            IconClass={CancelIcon}
                            onPress={onDelete}
                        />
                        <InfoListItem
                            style={styles.actionItem}
                            title={'Cancel'}
                            IconClass={ClearIcon}
                            onPress={hideActionsPanel}
                        />
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};
