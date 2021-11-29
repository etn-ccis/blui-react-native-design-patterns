import React from 'react';
import renderer from 'react-test-renderer';
import { VerifyOnSubmitScreen } from './VerifyOnSubmit';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Verify On Submit Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <VerifyOnSubmitScreen />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
