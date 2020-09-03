import React from 'react';
import renderer from 'react-test-renderer';
import { MultiselectListScreen } from './MultiselectList';
import { ListItem } from './utilities';
import { InfoListItem } from '@pxblue/react-native-components';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeArea: (): any => ({}),
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

describe('Multiselect List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<MultiselectListScreen hardcodedData={hardcodedData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should render 10 items by default', () => {
        const instance = renderer.create(<MultiselectListScreen />).root;
        const infoListItems = instance.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(10);
    });
});

// @TODO implement these tests

// it('Should delete an Item', () => {

// });

// it('Should clear all Items', () => {

// });
