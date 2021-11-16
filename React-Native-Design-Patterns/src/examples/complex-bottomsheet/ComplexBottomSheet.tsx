import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';
import { Header, InfoListItem, H6, EmptyState } from '@brightlayer-ui/react-native-components';
import { ComplexBottomSheetScreen } from './components/BottomSheet';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { IconToggle } from './components/IconToggle';
import { getAlarmList, formatDate, AlarmDataObject } from './data/alarmData';
import { useNavigation } from '@react-navigation/native';
import { Divider, useTheme } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const FILTERS = {
    TIME: 'time',
    TYPE: 'type',
};

const TYPES = {
    ALARM: 'alarm',
    SESSION: 'session',
    EVENT: 'settings',
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[100],
        flex: 1,
        position: 'relative',
    },
    bottomSheetItemTitle: {
        paddingLeft: 16,
        color: Colors.black[500],
        fontFamily: 'OpenSans-Regular',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
    rowHeader: {
        padding: 8,
        backgroundColor: Colors.white[100],
    },
    footer: {
        margin: 0,
        backgroundColor: Colors.white[100],
        shadowColor: Colors.black[900],
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        display: 'flex',
        bottom: 0,
        width: '100%',
        maxWidth: 600,
    },
});

export const sortEvents = (currentSort: string, alarmList: AlarmDataObject[]): AlarmDataObject[] => {
    switch (currentSort) {
        case FILTERS.TYPE:
            return alarmList.sort((a: AlarmDataObject, b: AlarmDataObject) => {
                // primary sort by type
                if (a.type < b.type) {
                    return -1;
                } else if (a.type > b.type) {
                    return 1;
                }
                // secondary sort by alarm active and/or date
                if (a.type !== TYPES.ALARM) {
                    return b.date - a.date;
                }
                if (a.active && !b.active) {
                    return -1;
                } else if (b.active && !a.active) {
                    return 1;
                }
                return b.date - a.date;
            });
        case FILTERS.TIME:
        default:
            return alarmList.sort((a: AlarmDataObject, b: AlarmDataObject) => b.date - a.date);
    }
};

export const filterEvents = (
    events: AlarmDataObject[],
    showActiveAlarms: boolean,
    showAlarms: boolean,
    showEvents: boolean,
    showSessions: boolean
): AlarmDataObject[] =>
    events.filter((item: AlarmDataObject) => {
        if (!showActiveAlarms && item.type === TYPES.ALARM && item.active) {
            return false;
        }
        if (!showAlarms && item.type === TYPES.ALARM && !item.active) {
            return false;
        }
        if (!showEvents && item.type === TYPES.EVENT) {
            return false;
        }
        if (!showSessions && item.type === TYPES.SESSION) {
            return false;
        }
        return true;
    });

const alarmList = getAlarmList(20);

export const ComplexBottomSheetAlarmsScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const theme = useTheme();
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [currentSort, setCurrentSort] = useState('time');
    const [showAlarms, setShowAlarms] = useState(true);
    const [showActiveAlarms, setShowActiveAlarms] = useState(true);
    const [showEvents, setShowEvents] = useState(true);
    const [showSessions, setShowSessions] = useState(true);

    const filteredAlarmList = filterEvents(
        sortEvents(currentSort, alarmList),
        showActiveAlarms,
        showAlarms,
        showEvents,
        showSessions
    );

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <>
            <Header
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
                title={'Complex Bottom Sheet'}
                actionItems={[
                    {
                        icon: <MatIcon name="more-vert" color={theme.colors.textPalette.onPrimary.main} size={24} />,
                        onPress: (): void => {
                            setShowBottomSheet(true);
                        },
                    },
                ]}
            />
            <SafeAreaView style={styles.container}>
                {filteredAlarmList.length ? (
                    <ScrollView>
                        {filteredAlarmList.map((item, index) => (
                            <InfoListItem
                                key={index}
                                title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                                subtitle={formatDate(item.date)}
                                backgroundColor={Colors.white[50]}
                                icon={
                                    (item.type === 'alarm' && item.active && (
                                        <MatIcon name="notifications-active" size={24} color={Colors.white[100]} />
                                    )) ||
                                    (item.type === 'alarm' && !item.active && (
                                        <MatIcon name="notifications" size={24} />
                                    )) ||
                                    (item.type === 'settings' && <MatIcon name="settings" size={24} />) ||
                                    (item.type === 'session' && <MatIcon name="update" size={24} />) ||
                                    undefined
                                }
                                iconColor={item.active ? Colors.white[100] : undefined}
                                fontColor={item.active ? Colors.red[500] : undefined}
                                statusColor={item.active ? Colors.red[500] : undefined}
                                avatar={item.active}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyState title={'No Data Found'} icon={<MatIcon name="error" size={100} />} />
                )}
            </SafeAreaView>
            <ComplexBottomSheetScreen
                show={showBottomSheet}
                dismissBottomSheet={(): void => setShowBottomSheet(false)}
                style={styles.footer}
            >
                <SafeAreaView>
                    <View style={styles.rowHeader}>
                        <H6>Sort By: </H6>
                        <View style={styles.row}>
                            <IconToggle
                                icon={<MatIcon name="access-time" size={24} />}
                                active={currentSort === FILTERS.TIME}
                                label={'Time'}
                                onPress={(): void => setCurrentSort(FILTERS.TIME)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                icon={<MatIcon name="info" size={24} />}
                                active={currentSort === FILTERS.TYPE}
                                label={'Type'}
                                onPress={(): void => setCurrentSort(FILTERS.TYPE)}
                            >
                                {' '}
                            </IconToggle>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.rowHeader}>
                        <H6>Show: </H6>
                        <View style={styles.row}>
                            <IconToggle
                                icon={<MatIcon name="notifications-active" size={24} />}
                                active={showActiveAlarms}
                                label={'Active Alarms'}
                                onPress={(): void => setShowActiveAlarms(!showActiveAlarms)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                icon={<MatIcon name="notifications" size={24} />}
                                active={showAlarms}
                                label={'Alarms'}
                                onPress={(): void => setShowAlarms(!showAlarms)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                icon={<MatIcon name="settings" size={24} />}
                                active={showEvents}
                                label={'Settings'}
                                onPress={(): void => setShowEvents(!showEvents)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                icon={<MatIcon name="update" size={24} />}
                                active={showSessions}
                                label={'Sessions'}
                                onPress={(): void => setShowSessions(!showSessions)}
                            >
                                {' '}
                            </IconToggle>
                        </View>
                    </View>
                    <Divider />
                    <InfoListItem
                        title={'Close'}
                        icon={<MatIcon name="clear" size={24} />}
                        onPress={(): void => setShowBottomSheet(false)}
                        testID={'cancel-button'}
                    />
                </SafeAreaView>
            </ComplexBottomSheetScreen>
        </>
    );
};
