import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import * as Colors from '@pxblue/colors'
import { Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: MaterialIcons, name: 'more-vert' });
const NotificatonsIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications' });
const NotificatonsActiveIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications-active' });
const DoneIcon = wrapIcon({ IconClass: MaterialIcons, name: 'done' });
const GetAppIcon = wrapIcon({ IconClass: MaterialIcons, name: 'get-app' });
const ClearIcon = wrapIcon({ IconClass: MaterialIcons, name: 'clear' });

import alarms, { formatDate } from './alarmData';
import { BottomSheetScreen } from './BottomSheet';

type AlarmsState = {
    showBottomSheet: boolean;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[100],
        flex: 1,
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
        bottom: 0,
        right: 0,
        width: '100%',
        maxWidth: 600,
    },
    bottomSheetItemTitle: {
        paddingLeft: 16,
    },
    overlay: {
        backgroundColor: Colors.black[900],
        opacity: 0.7,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

export const AlarmsScreen: React.FC = () => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const navigation = useNavigation();
    const toggleMenu = (): void => {
        navigation.openDrawer();
    };
    return (
        <>
            <Header
                title={'Bottom Sheet'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[
                    { icon: MoreIcon, onPress: (): void => { setShowBottomSheet(true) } }
                ]}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {
                        alarms.map((item, index) => (
                            <InfoListItem
                                key={index}
                                title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                                subtitle={formatDate(item.date)}
                                backgroundColor={Colors.white[50]}
                                IconClass={item.active ? NotificatonsActiveIcon : NotificatonsIcon}
                                iconColor={item.active ? Colors.white[100] : Colors.black[500]}
                                fontColor={item.active ? Colors.red[500] : Colors.black[500]}
                                statusColor={item.active ? Colors.red[500] : Colors.white[100]}
                                avatar={item.active}
                            />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
            {showBottomSheet ?
                <View
                    style={styles.overlay}
                    onTouchStart={(): void => setShowBottomSheet(false)}
                    testID={'overlay'}
                >
                </View>
                : null
            }
            <BottomSheetScreen style={styles.footer} show={showBottomSheet}>
                <InfoListItem
                    title={'Acknowledge All'}
                    IconClass={DoneIcon}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'menu-item-button-0'}
                />
                <InfoListItem
                    title={'Export'}
                    IconClass={GetAppIcon}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'menu-item-button-1'}
                />
                <InfoListItem
                    title={'Cancel'}
                    IconClass={ClearIcon}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'cancel-button'}
                />
            </BottomSheetScreen>
        </>
    );
}