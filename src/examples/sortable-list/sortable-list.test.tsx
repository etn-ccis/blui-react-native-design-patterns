import React from 'react';
import renderer from 'react-test-renderer';
import { SortableListScreen } from './SortableList';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Sortable List Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <SortableListScreen />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// @TODO: Implement the following test cases

// it('enables sorting', () => {

// });

// it('disables sorting', () => {

// });

// it('sorts appropriately', () => {

// });
