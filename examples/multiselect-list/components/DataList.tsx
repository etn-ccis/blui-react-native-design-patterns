import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import * as Colors from '@pxblue/colors';
import { IconButton, Button } from 'react-native-paper';
import { InfoListItem, EmptyState, wrapIcon } from '@pxblue/react-native-components';
import { SnackBar } from './SnackBar';
import { generateData } from '../utilities';
import { MaterialIcons } from '@expo/vector-icons';

const Check = wrapIcon({ IconClass: MaterialIcons, name: 'check-box' });
const UnCheck = wrapIcon({ IconClass: MaterialIcons, name: 'check-box-outline-blank' });
const ErrorIcon = wrapIcon({ IconClass: MaterialIcons, name: 'error' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[100],
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.white[100],
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
});

export const DataList: React.FC = () => {
    const [list, setList] = useState(generateData());
    const [selectedItems, setSelectedItems]: any = useState([]);

    const onSelect = (item: any): void => {
        const index = selectedItems.indexOf(item);
        if (index === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter((_: any, i: any) => i !== index));
        }
    };

    const isSelected = (item: any): boolean => selectedItems.indexOf(item) !== -1;

    const onDelete = (): void => {
        const updatedList = [...list];
        selectedItems.forEach((item: any) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });
        setList(updatedList);
        setSelectedItems([]);
    };

    const onCancel = (): void => {
        setSelectedItems([]);
    };

    const addData = (): void => {
        setList(generateData());
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                {list.length ? (
                    <ScrollView>
                        {list.map((item: any, index: number) => (
                            <InfoListItem
                                key={index}
                                title={item.name}
                                subtitle={item.details}
                                onPress={(): void => onSelect(item)}
                                backgroundColor={Colors.white[50]}
                                rightComponent={<></>}
                                IconClass={isSelected(item) ? Check : UnCheck}
                                iconColor={isSelected(item) ? Colors.blue[500] : ''}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyState
                        title={'No Data Found'}
                        IconClass={ErrorIcon}
                        actions={
                            <Button
                                icon={(): JSX.Element => (
                                    <MaterialIcons name="add" color={Colors.white[50]} size={24} />
                                )}
                                onPress={addData}
                                mode="contained"
                                accessibilityStates="add data"
                            >
                                Add Data
                            </Button>
                        }
                    />
                )}
            </SafeAreaView>
            <SnackBar style={styles.footer} show={selectedItems.length}>
                <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 16 }}> {selectedItems.length} selected items </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                        <IconButton
                            icon={(): JSX.Element => <MaterialIcons name="cancel" color={Colors.gray[800]} size={24} />}
                            onPress={onCancel}
                            accessibilityStates
                        />
                        <IconButton
                            icon={(): JSX.Element => <MaterialIcons name="delete" color={Colors.gray[800]} size={24} />}
                            onPress={onDelete}
                            accessibilityStates
                        />
                    </View>
                </SafeAreaView>
            </SnackBar>
        </>
    );
};
