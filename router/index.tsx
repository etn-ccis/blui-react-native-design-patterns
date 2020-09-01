import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from './routes';
import { NavigationDrawer } from './drawer';
import { Placeholder } from '../screens/Placeholder';
// Screens
import { Home } from '../screens/Home';
import { CollapsibleAppbarScreen } from '../examples/collapsible-appbar/CollapsibleAppbar';
import { DataListScreen } from '../examples/data-list/DataList';
import { BottomSheetAlarmsScreen } from '../examples/bottom-sheet/BottomSheet';
import { ActionListScreen } from '../examples/action-list/ActionList';
import { ComplexBottomSheetAlarmsScreen } from '../examples/complex-bottomsheet/ComplexBottomSheet';
import { LoadingStatesScreen } from '../examples/loading-states/LoadingStates';
import { StatusListScreen } from '../examples/status-list/StatusList';
import { SearchbarScreen } from '../examples/searchbar/Searchbar';

const Drawer = createDrawerNavigator();

export const MyDrawer: React.FC = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ width: '80%' }}
        drawerContent={(props): JSX.Element => <NavigationDrawer {...props} />}
    >
        <Drawer.Screen name={ROUTES.HOME.route} component={Home} />
        <Drawer.Screen name={ROUTES.COLLAPSIBLE_APPBAR.route} component={CollapsibleAppbarScreen} />
        <Drawer.Screen name={ROUTES.SEARCH_BAR.route} component={SearchbarScreen} />
        <Drawer.Screen name={ROUTES.LOADING_STATES.route} component={LoadingStatesScreen} />
        <Drawer.Screen name={ROUTES.FORM_VALIDATION.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.FORM_VALIDATION.name} />}
        </Drawer.Screen>
        <Drawer.Screen name={ROUTES.I18N.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.I18N.name} />}
        </Drawer.Screen>
        <Drawer.Screen name={ROUTES.ACTION_LIST.route} component={ActionListScreen} />
        <Drawer.Screen name={ROUTES.DATA_LIST.route} component={DataListScreen} />
        <Drawer.Screen name={ROUTES.MULTISELECT_LIST.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.MULTISELECT_LIST.name} />}
        </Drawer.Screen>
        <Drawer.Screen name={ROUTES.SORTABLE_LIST.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.SORTABLE_LIST.name} />}
        </Drawer.Screen>
        <Drawer.Screen name={ROUTES.STATUS_LIST.route} component={StatusListScreen} />
        <Drawer.Screen name={ROUTES.RESPONSIVE_TABLE.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.RESPONSIVE_TABLE.name} />}
        </Drawer.Screen>
        <Drawer.Screen name={ROUTES.COMPLEX_BOTTOMSHEET.route} component={ComplexBottomSheetAlarmsScreen} />
        <Drawer.Screen name={ROUTES.BOTTOMSHEET.route} component={BottomSheetAlarmsScreen} />
        <Drawer.Screen name={ROUTES.DYNAMIC_STEPPER.route}>
            {(): JSX.Element => <Placeholder title={ROUTES.DYNAMIC_STEPPER.name} />}
        </Drawer.Screen>
    </Drawer.Navigator>
);
