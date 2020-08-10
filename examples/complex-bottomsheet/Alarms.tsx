import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Header, InfoListItem, wrapIcon, H6 } from '@pxblue/react-native-components';
import SafeAreaView from 'react-native-safe-area-view';
import { ComplexBottomSheetScreen } from './BottomSheet';
import { MaterialIcons } from '@expo/vector-icons';
import { IconToggle } from './components/IconToggle';
import { getAlarmList, formatDate, AlarmDataObject } from './alarmData';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: MaterialIcons, name: 'more-vert' });
const NotificatonsIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications' });
const NotificatonsActiveIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications-active' });
const InfoIcon = wrapIcon({ IconClass: MaterialIcons, name: 'info' });
const AccessTimeIcon = wrapIcon({ IconClass: MaterialIcons, name: 'access-time' });
const SettingsIcon = wrapIcon({ IconClass: MaterialIcons, name: 'settings' });
const UpdateIcon = wrapIcon({ IconClass: MaterialIcons, name: 'update' });
const ClearIcon = wrapIcon({ IconClass: MaterialIcons, name: 'clear' });

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
    const navigation = useNavigation();
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
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                title={'Complex Bottom Sheet'}
                actionItems={[
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            setShowBottomSheet(true);
                        },
                    },
                ]}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {filteredAlarmList.map((item, index) => (
                        <InfoListItem
                            key={index}
                            title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                            subtitle={formatDate(item.date)}
                            backgroundColor={Colors.white[50]}
                            IconClass={
                                (item.type === 'alarm' && item.active && NotificatonsActiveIcon) ||
                                (item.type === 'alarm' && !item.active && NotificatonsIcon) ||
                                (item.type === 'settings' && SettingsIcon) ||
                                (item.type === 'session' && UpdateIcon)
                            }
                            iconColor={item.active ? Colors.white[100] : Colors.black[500]}
                            fontColor={item.active ? Colors.red[500] : Colors.black[500]}
                            statusColor={item.active ? Colors.red[500] : Colors.white[50]}
                            avatar={true}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
            <ComplexBottomSheetScreen
                show={showBottomSheet}
                dismissBottomSheet={(): void => setShowBottomSheet(false)}
                style={styles.footer}
            >
                <SafeAreaView forceInset={{ bottom: 'always' }}>
                    <View style={styles.rowHeader}>
                        <H6>Sort By: </H6>
                        <View style={styles.row}>
                            <IconToggle
                                IconComponent={AccessTimeIcon}
                                active={currentSort === FILTERS.TIME}
                                label={'Time'}
                                onPress={(): void => setCurrentSort(FILTERS.TIME)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                IconComponent={InfoIcon}
                                active={currentSort === FILTERS.TYPE}
                                label={'Type'}
                                onPress={(): void => setCurrentSort(FILTERS.TYPE)}
                            >
                                {' '}
                            </IconToggle>
                        </View>
                    </View>
                    <Divider accessibilityStates />
                    <View style={styles.rowHeader}>
                        <H6>Show: </H6>
                        <View style={styles.row}>
                            <IconToggle
                                IconComponent={NotificatonsActiveIcon}
                                active={showActiveAlarms}
                                label={'Active Alarms'}
                                onPress={(): void => setShowActiveAlarms(!showActiveAlarms)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                IconComponent={NotificatonsIcon}
                                active={showAlarms}
                                label={'Alarms'}
                                onPress={(): void => setShowAlarms(!showAlarms)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                IconComponent={SettingsIcon}
                                active={showEvents}
                                label={'Settings'}
                                onPress={(): void => setShowEvents(!showEvents)}
                            >
                                {' '}
                            </IconToggle>
                            <IconToggle
                                IconComponent={UpdateIcon}
                                active={showSessions}
                                label={'Sessions'}
                                onPress={(): void => setShowSessions(!showSessions)}
                            >
                                {' '}
                            </IconToggle>
                        </View>
                    </View>
                    <Divider accessibilityStates />
                    <InfoListItem
                        title={'Close'}
                        IconClass={ClearIcon}
                        onPress={(): void => setShowBottomSheet(false)}
                        testID={'cancel-button'}
                    />
                </SafeAreaView>
            </ComplexBottomSheetScreen>
        </>
    );
};
