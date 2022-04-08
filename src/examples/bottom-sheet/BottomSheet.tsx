import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, ViewStyle } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';
import { Header, InfoListItem } from '@brightlayer-ui/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import alarms, { formatDate } from './data/alarmData';
import { BottomSheetScreen } from './components/BottomSheet';
import { useTheme } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const useStyles = (
    theme: ReactNativePaper.Theme
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
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const theme = useTheme();
    const defaultStyles = useStyles(theme);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View style={defaultStyles.container}>
            <Header
                title={'Bottom Sheet'}
                icon={
                    <MatIcon
                        name="menu"
                        color={theme.colors.textPalette?.onPrimary?.main || Colors.white[50]}
                        size={24}
                    />
                }
                onIconPress={(): void => {
                    toggleMenu();
                }}
                actionItems={[
                    {
                        icon: (
                            <MatIcon
                                name="more-vert"
                                color={theme.colors.textPalette?.onPrimary?.main || Colors.white[50]}
                                size={24}
                            />
                        ),
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
                        icon={
                            item.active ? (
                                <MatIcon name="notifications-active" size={24} color={Colors.white[100]} />
                            ) : (
                                <MatIcon name="notifications" size={24} color={theme.colors.textPalette.primary} />
                            )
                        }
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
                    icon={<MatIcon name="done" size={24} color={theme.colors.textPalette.primary} />}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'menu-item-button-0'}
                    dense
                />
                <InfoListItem
                    title={'Export'}
                    icon={<MatIcon name="get-app" size={24} color={theme.colors.textPalette.primary} />}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'menu-item-button-1'}
                    dense
                />
                <InfoListItem
                    title={'Cancel'}
                    icon={<MatIcon name="clear" size={24} color={theme.colors.textPalette.primary} />}
                    onPress={(): void => setShowBottomSheet(false)}
                    testID={'cancel-button'}
                    dense
                />
            </BottomSheetScreen>
        </View>
    );
};
