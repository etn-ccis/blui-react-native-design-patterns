import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem } from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback } from 'react';
import * as Colors from '@brightlayer-ui/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { ROUTES } from './routes';

export const navGroupItems: NavItem[] = [
    {
        title: 'Home',
        itemID: ROUTES.HOME.route,
    },
    {
        title: 'App Bar',
        itemID: 'app-bar',
        items: [
            {
                title: ROUTES.COLLAPSIBLE_APPBAR.name,
                itemID: ROUTES.COLLAPSIBLE_APPBAR.route,
            },
            {
                title: ROUTES.SEARCH_BAR.name,
                itemID: ROUTES.SEARCH_BAR.route,
            },
        ],
    },
    {
        title: ROUTES.LOADING_STATES.name,
        itemID: ROUTES.LOADING_STATES.route,
    },
    {
        title: ROUTES.FORMS_AND_VALIDATION.name,
        itemID: ROUTES.FORMS_AND_VALIDATION.name,
        items: [
            {
                title: ROUTES.PASSWORD_VALIDATION.name,
                itemID: ROUTES.PASSWORD_VALIDATION.route,
            },
            {
                title: ROUTES.FIXED_LENGTH_PASSCODE.name,
                itemID: ROUTES.FIXED_LENGTH_PASSCODE.route,
            },
            {
                title: ROUTES.VERIFY_ON_SUBMIT.name,
                itemID: ROUTES.VERIFY_ON_SUBMIT.route,
            },
            {
                title: ROUTES.FORM_IN_A_LIST.name,
                itemID: ROUTES.FORM_IN_A_LIST.route,
            },
        ],
    },
    // {
    //     title: ROUTES.I18N.name,
    //     itemID: ROUTES.I18N.route,
    // },
    {
        title: 'Lists',
        itemID: 'lists',
        items: [
            {
                title: ROUTES.ACTION_LIST.name,
                itemID: ROUTES.ACTION_LIST.route,
            },
            {
                title: ROUTES.DATA_LIST.name,
                itemID: ROUTES.DATA_LIST.route,
            },
            {
                title: ROUTES.MULTISELECT_LIST.name,
                itemID: ROUTES.MULTISELECT_LIST.route,
            },
            {
                title: ROUTES.SORTABLE_LIST.name,
                itemID: ROUTES.SORTABLE_LIST.route,
            },
            {
                title: ROUTES.STATUS_LIST.name,
                itemID: ROUTES.STATUS_LIST.route,
            },
            // {
            //     title: ROUTES.RESPONSIVE_TABLE.name,
            //     itemID: ROUTES.RESPONSIVE_TABLE.route,
            // },
        ],
    },
    {
        title: 'Overlays',
        itemID: 'overlays',
        items: [
            {
                title: ROUTES.BOTTOMSHEET.name,
                itemID: ROUTES.BOTTOMSHEET.route,
            },
            {
                title: ROUTES.COMPLEX_BOTTOMSHEET.name,
                itemID: ROUTES.COMPLEX_BOTTOMSHEET.route,
            },
        ],
    },
    // {
    //     title: ROUTES.DYNAMIC_STEPPER.name,
    //     itemID: ROUTES.DYNAMIC_STEPPER.route,
    // },
];

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

// list of drawer item id's that don't navigate to another screen or cause the drawer to close
const idsWithoutRoutes = ['app-bar', ROUTES.FORMS_AND_VALIDATION.name, 'lists', 'overlays'];

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');

    const selectItem = useCallback(
        (id) => {
            if (!idsWithoutRoutes.includes(id)) {
                navigation.navigate(id);
                navigation.closeDrawer();
            }
            setSelected(id);
        },
        [navigation]
    );

    return (
        <Drawer activeItem={selected} onItemSelect={(id: string): void => selectItem(id)}>
            <DrawerHeader
                title={'Brightlayer UI'}
                subtitle={'React Native Project'}
                fontColor={Colors.white[50]}
                icon={{ name: 'menu' }}
                onIconPress={(): void => {
                    navigation.closeDrawer();
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems} hidePadding={true} />
            </DrawerBody>
        </Drawer>
    );
};
