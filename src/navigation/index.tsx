import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavDrawerProps, NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Placeholder } from '../screens';
import { ROUTES } from './routes';
import { ActionListScreen } from '../examples/action-list/ActionList';
import { BottomSheetAlarmsScreen } from '../examples/bottom-sheet/BottomSheet';
import { CollapsibleAppbarScreen } from '../examples/collapsible-appbar/CollapsibleAppbar';
import { ComplexBottomSheetAlarmsScreen } from '../examples/complex-bottomsheet/ComplexBottomSheet';
import { DataListScreen } from '../examples/data-list/DataList';
import { FormValidationScreen } from '../examples/form-validation/FormValidation';
import { FixedLengthPasscodeScreen } from '../examples/forms-and-validation/fixed-length-passcode/FixedLengthPasscode';
import { FormInAListScreen } from '../examples/forms-and-validation/form-in-a-list/FormInAList';
import { PasswordValidationScreen } from '../examples/forms-and-validation/password-validation/PasswordValidation';
import { VerifyOnSubmitScreen } from '../examples/forms-and-validation/verify-on-submit/VerifyOnSubmit';
import { LoadingStatesScreen } from '../examples/loading-states/LoadingStates';
import { MultiselectListScreen } from '../examples/multiselect-list/MultiselectList';
import { SearchbarScreen } from '../examples/searchbar/Searchbar';
import { SortableListScreen } from '../examples/sortable-list/SortableList';
import { StatusListScreen } from '../examples/status-list/StatusList';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    home: undefined;
    'collapsible-appbar': undefined;
    'search-bar': undefined;
    'loading-states': undefined;
    'password-validation': undefined;
    'fixed-length-passcode': undefined;
    'verify-on-submit': undefined;
    'form-in-a-list': undefined;
    internationalization: undefined;
    'action-list': undefined;
    'data-list': undefined;
    'multiselect-list': undefined;
    'sortable-list': undefined;
    'status-list': undefined;
    'responsive-table': undefined;
    bottomsheet: undefined;
    'complex-bottomsheet': undefined;
    'dynamic-stepper': undefined;
    NavigationDrawer: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

export const MainRouter = (): any => (
    <NavigationContainer>
        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{ backgroundColor: 'transparent', width: '80%' }}
            drawerContent={(props: NavDrawerProps): ReactNode => <CustomDrawerContent {...props} />}
        >
            <RootStack.Screen name={'home'} component={Home} />
            <RootStack.Screen name={'collapsible-appbar'} component={CollapsibleAppbarScreen} />
            <RootStack.Screen name={'search-bar'} component={SearchbarScreen} />
            <RootStack.Screen name={`loading-states`} component={LoadingStatesScreen} />
            <RootStack.Screen name={'password-validation'} component={PasswordValidationScreen} />
            <RootStack.Screen name={'fixed-length-passcode'} component={FixedLengthPasscodeScreen} />
            <RootStack.Screen name={'verify-on-submit'} component={VerifyOnSubmitScreen} />
            <RootStack.Screen name={'form-in-a-list'} component={FormInAListScreen} />
            <RootStack.Screen name={'internationalization'}>
                {(): JSX.Element => <Placeholder title={ROUTES.I18N.name} />}
            </RootStack.Screen>
            <RootStack.Screen name={'action-list'} component={ActionListScreen} />
            <RootStack.Screen name={'data-list'} component={DataListScreen} />
            <RootStack.Screen name={'multiselect-list'} component={MultiselectListScreen} />
            <RootStack.Screen name={'sortable-list'} component={SortableListScreen} />
            <RootStack.Screen name={'status-list'} component={StatusListScreen} />
            <RootStack.Screen name={'responsive-table'}>
                {(): JSX.Element => <Placeholder title={ROUTES.RESPONSIVE_TABLE.name} />}
            </RootStack.Screen>
            <RootStack.Screen name={'complex-bottomsheet'} component={ComplexBottomSheetAlarmsScreen} />
            <RootStack.Screen name={'bottomsheet'} component={BottomSheetAlarmsScreen} />
            <RootStack.Screen name={'dynamic-stepper'}>
                {(): JSX.Element => <Placeholder title={ROUTES.DYNAMIC_STEPPER.name} />}
            </RootStack.Screen>
        </Drawer.Navigator>
    </NavigationContainer>
);
