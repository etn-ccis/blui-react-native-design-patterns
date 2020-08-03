import React, { useState } from 'react';
import { Header, wrapIcon, InfoListItem, EmptyState } from '@pxblue/react-native-components';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@pxblue/colors';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const DeleteIcon = wrapIcon({ IconClass: MaterialIcons, name: 'delete' });
const AddIcon = wrapIcon({ IconClass: MaterialIcons, name: 'add' });
const CancelIcon = wrapIcon({ IconClass: MaterialIcons, name: 'cancel' });
const ClearIcon = wrapIcon({ IconClass: MaterialIcons, name: 'clear' });

type ListItem = {
    id?: number;
    name?: string;
    details?: string;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export const ActionListScreen: React.FC = () => {
    const createRandomItem = (): ListItem => {
        const randomInt = parseInt(`${Math.random() * 100}`, 10);
        return { id: randomInt, name: `Item ${randomInt}`, details: `Item ${randomInt} occurred` };
    };

    const prepareData = (): ListItem[] => {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push(createRandomItem());
        }
        return data;
    };

    const navigation = useNavigation();
    const [data, setData] = useState(prepareData());
    const [isModalVisible, setIsMobileVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const hideModal = (): void => {
        setIsMobileVisible(false);
        setSelectedItemIndex(null);
    };

    const showModal = (itemIndex: number): void => {
        setIsMobileVisible(true);
        setSelectedItemIndex(itemIndex);
    };

    const addItem = (): void => {
        setData([...data, createRandomItem()]);
    };

    const onDelete = (): void => {
        const updatedData: ListItem[] = [...data];
        updatedData.splice(selectedItemIndex, 1);
        setData(updatedData);
        hideModal();
    };

    const deleteAll = (): void => {
        setData([]);
    };

    return (
        <View style={styles.container}>
            <Header
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
                    keyExtractor={(_item, index): string => `${index}`}
                    renderItem={({ item, index }): JSX.Element => (
                        <InfoListItem
                            title={item.name || ''}
                            hidePadding={true}
                            subtitle={item.details}
                            backgroundColor={Colors.white[50]}
                            rightComponent={
                                <MaterialIcons
                                    name="more-vert"
                                    onPress={(): void => showModal(index)}
                                    color={Colors.black[500]}
                                />
                            }
                        />
                    )}
                />
            ) : (
                <EmptyState
                    title={'No Items found'}
                    actions={
                        <Button icon={AddIcon} onPress={addItem} mode="contained" accessibilityStates="add an item">
                            Add An Item
                        </Button>
                    }
                />
            )}
            <SafeAreaView>
                <Modal
                    isVisible={isModalVisible}
                    backdropOpacity={0.5}
                    supportedOrientations={['portrait', 'landscape']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <View style={{ backgroundColor: Colors.white[50] }}>
                        <InfoListItem title={'Remove'} IconClass={CancelIcon} onPress={onDelete} />
                        <InfoListItem title={'Cancel'} IconClass={ClearIcon} onPress={hideModal} />
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};
