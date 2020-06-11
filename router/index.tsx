import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Home } from '../screens/Home';
import { Placeholder } from '../screens/Placeholder';
import { ReactNode } from 'react';
import { Drawer as PXBDrawer, DrawerHeader, DrawerBody, DrawerNavGroup, DrawerFooter } from '@pxblue/react-native-components';
import * as Colors from '@pxblue/colors';
import { IconButton } from 'react-native-paper';
import { ROUTES } from './routes';


const Drawer = createDrawerNavigator();

type TestProps = {
    test: string;
}

export const MyDrawer: React.FC = () =>
    <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ width: '80%' }}
        drawerContent={(props) => <TestDrawer {...props} />}
    >
        {Object.keys(ROUTES).map((route) => {
            if (!ROUTES[route].items && ROUTES[route].screen !== undefined) {
                return <Drawer.Screen key={ROUTES[route].location} name={ROUTES[route].location} component={ROUTES[route].screen as React.ComponentType<any>} />
            }
            else if (ROUTES[route].items) {
                return Object.keys(ROUTES[route].items).map((innerRoute: string) => {
                    return <Drawer.Screen key={ROUTES[route].items[innerRoute].location} name={ROUTES[route].items[innerRoute].location} component={ROUTES[route].items[innerRoute].screen as React.ComponentType<any>} />
                })
            }
        })}
        {/* <Drawer.Screen name={'Home'} component={Home} /> */}
    </Drawer.Navigator>

const TestDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const { navigation } = props;

    const goTo = useCallback((route: string) => {
        navigation.navigate(route);
    }, [navigation]);

    return (
        <PXBDrawer>
            <DrawerHeader
                title={'PX Blue'}
                subtitle={'React Native Code Examples'}
                styles={{
                    subtitle: { lineHeight: 16 },
                }}
                // backgroundImage={headerBgImage}
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
                <DrawerNavGroup hidePadding items={
                    Object.keys(ROUTES).map((route) => {
                        if (!ROUTES[route].items && ROUTES[route].screen !== undefined) {
                            return {
                                title: ROUTES[route].title,
                                itemID: ROUTES[route].location,
                                onPress: () => goTo(ROUTES[route].location),
                            }
                        }
                        else if (ROUTES[route].items) {
                            return {
                                title: ROUTES[route].title,
                                itemID: ROUTES[route].location,
                                items: Object.keys(ROUTES[route].items).map((innerRoute: string) => {
                                    return {
                                        title: ROUTES[route].items[innerRoute].title,
                                        itemID: ROUTES[route].items[innerRoute].location,
                                        onPress: () => goTo(ROUTES[route].items[innerRoute].location),
                                    }
                                })
                            }



                        }
                    })
                    // [
                    // {
                    //     title: 'Hello',
                    //     itemID: 'Hello',
                    //     onPress: () => goTo('Home'),
                    // }
                    // ]
                } />
            </DrawerBody>
            <DrawerFooter>
                {/* <Divider /> */}
                <View style={{ padding: 16, backgroundColor: 'white', alignItems: 'center' }}>
                    {/* <Image source={eatonLogo} style={{ height: 60, width: '80%' }} /> */}
                </View>
            </DrawerFooter>
        </PXBDrawer>
    );
}