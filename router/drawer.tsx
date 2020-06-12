import React, { useCallback } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer, DrawerHeader, DrawerBody, DrawerNavGroup, DrawerFooter } from '@pxblue/react-native-components';
import { IconButton } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { ROUTES } from './routes';
import { View } from 'react-native';
import bg from '../assets/images/topology.png';

export const NavigationDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const { navigation } = props;

    const goTo = useCallback(
        (route: string) => {
            navigation.navigate(route);
        },
        [navigation]
    );

    return (
        <Drawer>
            <DrawerHeader
                title={'PX Blue'}
                subtitle={'React Native Code Examples'}
                styles={{
                    subtitle: { lineHeight: 16 },
                }}
                backgroundImage={bg}
                icon={
                    <IconButton
                        icon="menu"
                        size={24}
                        color={Colors.white[50]}
                        onPress={(): void => {
                            navigation.closeDrawer();
                        }}
                    />
                }
            />
            <DrawerBody>
                <DrawerNavGroup
                    hidePadding
                    items={[
                        {
                            title: ROUTES.HOME.name,
                            itemID: ROUTES.HOME.route,
                            onPress: (): void => goTo(ROUTES.HOME.route),
                        },
                        {
                            title: 'App Bars',
                            itemID: 'app-bars',
                            items: [
                                {
                                    title: ROUTES.COLLAPSIBLE_APPBAR.name,
                                    itemID: ROUTES.COLLAPSIBLE_APPBAR.name,
                                    onPress: (): void => goTo(ROUTES.COLLAPSIBLE_APPBAR.route),
                                },
                                {
                                    title: ROUTES.SEARCH_BAR.name,
                                    itemID: ROUTES.SEARCH_BAR.name,
                                    onPress: (): void => goTo(ROUTES.SEARCH_BAR.route),
                                },
                            ],
                        },
                        {
                            title: ROUTES.LOADING_STATES.name,
                            itemID: ROUTES.LOADING_STATES.name,
                            onPress: (): void => goTo(ROUTES.LOADING_STATES.route),
                        },
                        {
                            title: ROUTES.FORM_VALIDATION.name,
                            itemID: ROUTES.FORM_VALIDATION.name,
                            onPress: (): void => goTo(ROUTES.FORM_VALIDATION.route),
                        },
                        {
                            title: ROUTES.I18N.name,
                            itemID: ROUTES.I18N.name,
                            onPress: (): void => goTo(ROUTES.I18N.route),
                        },
                        {
                            title: 'Lists',
                            itemID: 'lists',
                            items: [
                                {
                                    title: ROUTES.ACTION_LIST.name,
                                    itemID: ROUTES.ACTION_LIST.name,
                                    onPress: (): void => goTo(ROUTES.ACTION_LIST.route),
                                },
                                {
                                    title: ROUTES.DATA_LIST.name,
                                    itemID: ROUTES.DATA_LIST.name,
                                    onPress: (): void => goTo(ROUTES.DATA_LIST.route),
                                },
                                {
                                    title: ROUTES.MULTISELECT_LIST.name,
                                    itemID: ROUTES.MULTISELECT_LIST.name,
                                    onPress: (): void => goTo(ROUTES.MULTISELECT_LIST.route),
                                },
                                {
                                    title: ROUTES.SORTABLE_LIST.name,
                                    itemID: ROUTES.SORTABLE_LIST.name,
                                    onPress: (): void => goTo(ROUTES.SORTABLE_LIST.route),
                                },
                                {
                                    title: ROUTES.STATUS_LIST.name,
                                    itemID: ROUTES.STATUS_LIST.name,
                                    onPress: (): void => goTo(ROUTES.STATUS_LIST.route),
                                },
                                {
                                    title: ROUTES.RESPONSIVE_TABLE.name,
                                    itemID: ROUTES.RESPONSIVE_TABLE.name,
                                    onPress: (): void => goTo(ROUTES.RESPONSIVE_TABLE.route),
                                },
                            ],
                        },
                        {
                            title: 'Overlays',
                            itemID: 'overlays',
                            items: [
                                {
                                    title: ROUTES.BOTTOMSHEET.name,
                                    itemID: ROUTES.BOTTOMSHEET.name,
                                    onPress: (): void => goTo(ROUTES.BOTTOMSHEET.route),
                                },
                                {
                                    title: ROUTES.COMPLEX_BOTTOMSHEET.name,
                                    itemID: ROUTES.COMPLEX_BOTTOMSHEET.name,
                                    onPress: (): void => goTo(ROUTES.COMPLEX_BOTTOMSHEET.route),
                                },
                            ],
                        },
                        {
                            title: ROUTES.DYNAMIC_STEPPER.name,
                            itemID: ROUTES.DYNAMIC_STEPPER.name,
                            onPress: (): void => goTo(ROUTES.DYNAMIC_STEPPER.route),
                        },
                    ]}
                />
            </DrawerBody>
            <DrawerFooter>
                {/* <Divider /> */}
                <View style={{ padding: 16, backgroundColor: 'white', alignItems: 'center' }}>
                    {/* <Image source={eatonLogo} style={{ height: 60, width: '80%' }} /> */}
                </View>
            </DrawerFooter>
        </Drawer>
    );
};
