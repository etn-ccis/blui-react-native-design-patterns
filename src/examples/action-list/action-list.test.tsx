import React from 'react';
import renderer from 'react-test-renderer';
import { ActionListScreen, ListItem } from './ActionList';
import { InfoListItem } from '@brightlayer-ui/react-native-components';
import { FlatList } from 'react-native';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

const hardcodedData: ListItem[] = [
    {
        id: 1,
        name: 'item 1',
        details: 'item 1 details',
    },
    {
        id: 2,
        name: 'item 2',
        details: 'item 2 details',
    },
    {
        id: 3,
        name: 'item 3',
        details: 'item 3 details',
    },
];

describe('Action List Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <ActionListScreen hardcodedData={hardcodedData} />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('Should render 3 items if 3 items are passed in', () => {
    //     const instance = renderer.create(
    //         <SafeAreaProvider>
    //             <ActionListScreen hardcodedData={hardcodedData} />
    //         </SafeAreaProvider>
    //     ).root;
    //     const flatList = instance.findByType(FlatList);
    //     const infoListItems = flatList.findAllByType(InfoListItem);
    //     expect(infoListItems).toHaveLength(3);
    // });

    // it('Should render 10 items by default', () => {
    //     const instance = renderer.create(
    //         <SafeAreaProvider>
    //             <ActionListScreen />
    //         </SafeAreaProvider>
    //     ).root;
    //     const flatList = instance.findByType(FlatList);
    //     const infoListItems = flatList.findAllByType(InfoListItem);
    //     expect(infoListItems).toHaveLength(10);
    // });

    // @TODO: Implement the following test cases:

    // it('Should add an item', () => {

    // });

    // it('Should delete an item', () => {

    // });

    // it('Should delete all items', () => {

    // });

    // it('Should hide ActionsPanel by default', () => {

    // })

    // it('Should show ActionsPanel when clicking an items action button', () => {

    // })
});
