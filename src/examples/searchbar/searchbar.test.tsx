import React from 'react';
import renderer from 'react-test-renderer';
import { SearchbarScreen } from './Searchbar';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('SearchBar Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <SearchbarScreen />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
