/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import React from 'react';
import { useFonts } from 'expo-font';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import AppLoading from 'expo-app-loading';
import { MyDrawer } from './router';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
    const [fontsLoaded] = useFonts({
        'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ThemeProvider theme={BLUIThemes.blue}>
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        </ThemeProvider>
    );
};
export default App;
