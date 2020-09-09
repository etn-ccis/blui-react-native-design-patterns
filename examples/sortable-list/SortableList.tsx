import React, { useState } from 'react';
import { Header, wrapIcon, InfoListItem } from '@pxblue/react-native-components';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Colors from '@pxblue/colors';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Surface } from 'react-native-paper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const DragHandleIcon = wrapIcon({ IconClass: MaterialIcons, name: 'drag-handle' });
const SaveIcon = wrapIcon({ IconClass: MaterialIcons, name: 'check' });
const EditIcon = wrapIcon({ IconClass: MaterialIcons, name: 'edit' });

type ListItem = {
    name: string;
    value: number;
};

type DraggableItemProps = {
    item: ListItem;
    index: number;
    drag: () => void;
    isActive: boolean;
};

type ItemProps = {
    item: ListItem;
};

type DataProps = {
    data: ListItem[];
};

const exampleData: ListItem[] = [
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[50],
    },
});

export const SortableListScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const [sortableData, setSortableData] = useState(exampleData);
    const [isSortable, setIsSortable] = useState(false);

    const renderDragableItem = ({ item, drag, isActive }: DraggableItemProps): JSX.Element => (
        <TouchableOpacity onLongPress={drag}>
            <Surface accessibilityStates style={{ elevation: isActive ? 4 : 0 }}>
                <InfoListItem
                    title={item.name}
                    rightComponent={<Text>{item.value}</Text>}
                    IconClass={DragHandleIcon}
                    backgroundColor={Colors.white[50]}
                />
            </Surface>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: ItemProps): JSX.Element => (
        <InfoListItem title={item.name} rightComponent={<Text>{item.value}</Text>} />
    );

    const toggleEdit = (): void => {
        setIsSortable(!isSortable);
    };

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View style={styles.container}>
            <Header
                title={'Sortable List'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[
                    {
                        icon: isSortable ? SaveIcon : EditIcon,
                        onPress: (): void => {
                            toggleEdit();
                        },
                    },
                ]}
            />
            {isSortable ? (
                <DraggableFlatList
                    data={sortableData}
                    renderItem={renderDragableItem}
                    keyExtractor={(item: ListItem, index: number): string => `${index}`}
                    onDragEnd={({ data }: DataProps): void => setSortableData(data)}
                />
            ) : (
                <FlatList
                    data={sortableData}
                    renderItem={renderItem}
                    keyExtractor={(item: ListItem, index: number): string => `${index}`}
                />
            )}
        </View>
    );
};
