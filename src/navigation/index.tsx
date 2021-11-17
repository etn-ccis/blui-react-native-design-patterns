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
    Home: undefined;
    PageOne: undefined;
    PageTwo: undefined;
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
            <RootStack.Screen name={ROUTES.HOME.route} component={Home} />
            <RootStack.Screen name={ROUTES.COLLAPSIBLE_APPBAR.route} component={CollapsibleAppbarScreen} />
            <RootStack.Screen name={ROUTES.SEARCH_BAR.route} component={SearchbarScreen} />
            <RootStack.Screen name={ROUTES.LOADING_STATES.route} component={LoadingStatesScreen} />
            <RootStack.Screen name={ROUTES.FORM_VALIDATION.route} component={FormValidationScreen} />
            <RootStack.Screen name={ROUTES.PASSWORD_VALIDATION.route} component={PasswordValidationScreen} />
            <RootStack.Screen name={ROUTES.FIXED_LENGTH_PASSCODE.route} component={FixedLengthPasscodeScreen} />
            <RootStack.Screen name={ROUTES.VERIFY_ON_SUBMIT.route} component={VerifyOnSubmitScreen} />
            <RootStack.Screen name={ROUTES.FORM_IN_A_LIST.route} component={FormInAListScreen} />
            <RootStack.Screen name={ROUTES.I18N.route}>
                {(): JSX.Element => <Placeholder title={ROUTES.I18N.name} />}
            </RootStack.Screen>
            <RootStack.Screen name={ROUTES.ACTION_LIST.route} component={ActionListScreen} />
            <RootStack.Screen name={ROUTES.DATA_LIST.route} component={DataListScreen} />
            <RootStack.Screen name={ROUTES.MULTISELECT_LIST.route} component={MultiselectListScreen} />
            <RootStack.Screen name={ROUTES.SORTABLE_LIST.route} component={SortableListScreen} />
            <RootStack.Screen name={ROUTES.STATUS_LIST.route} component={StatusListScreen} />
            <RootStack.Screen name={ROUTES.RESPONSIVE_TABLE.route}>
                {(): JSX.Element => <Placeholder title={ROUTES.RESPONSIVE_TABLE.name} />}
            </RootStack.Screen>
            <RootStack.Screen name={ROUTES.COMPLEX_BOTTOMSHEET.route} component={ComplexBottomSheetAlarmsScreen} />
            <RootStack.Screen name={ROUTES.BOTTOMSHEET.route} component={BottomSheetAlarmsScreen} />
            <RootStack.Screen name={ROUTES.DYNAMIC_STEPPER.route}>
                {(): JSX.Element => <Placeholder title={ROUTES.DYNAMIC_STEPPER.name} />}
            </RootStack.Screen>
        </Drawer.Navigator>
    </NavigationContainer>
);
