import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, ViewStyle } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import alarms, { formatDate } from './data/alarmData';
import { BottomSheetScreen } from './components/BottomSheet';
import { Theme, useTheme } from 'react-native-paper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: MaterialIcons, name: 'more-vert' });
const NotificatonsIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications' });
const NotificatonsActiveIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications-active' });
const DoneIcon = wrapIcon({ IconClass: MaterialIcons, name: 'done' });
const GetAppIcon = wrapIcon({ IconClass: MaterialIcons, name: 'get-app' });
const ClearIcon = wrapIcon({ IconClass: MaterialIcons, name: 'clear' });

const useStyles = (
    theme: Theme
): StyleSheet.NamedStyles<{
    container: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
        },
    });

export const BottomSheetAlarmsScreen: React.FC = () => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const navigation = useNavigation();
    const theme = useTheme();
    const defaultStyles = useStyles(theme);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View style={defaultStyles.container}>
            <Header
                title={'Bottom Sheet'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            setShowBottomSheet(true);
                        },
                    },
                ]}
            />
            <ScrollView>
                {alarms.map((item, index) => (
                    <InfoListItem
                        key={index}
                        title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                        subtitle={formatDate(item.date)}
                        IconClass={item.active ? NotificatonsActiveIcon : NotificatonsIcon}
                        iconColor={item.active ? Colors.white[100] : Colors.black[500]}
                        fontColor={item.active ? Colors.red[500] : Colors.black[500]}
                        statusColor={item.active ? Colors.red[500] : Colors.white[100]}
                        avatar={item.active}
                    />
                ))}
            </ScrollView>
            <BottomSheetScreen show={showBottomSheet} dismissBottomSheet={(): void => setShowBottomSheet(false)}>
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
        </View>
    );
};
