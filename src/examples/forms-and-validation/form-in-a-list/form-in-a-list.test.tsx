import React from 'react';
import renderer from 'react-test-renderer';
import { FormInAListScreen } from './FormInAList';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Password Validation Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <FormInAListScreen />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
