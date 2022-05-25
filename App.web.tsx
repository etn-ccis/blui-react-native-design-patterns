/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { MainRouter } from './src/navigation';

export const App = (): JSX.Element => (
    <ThemeProvider theme={BLUIThemes.blue}>
        <SafeAreaProvider>
            <MainRouter />
        </SafeAreaProvider>
    </ThemeProvider>
);

export default App;
