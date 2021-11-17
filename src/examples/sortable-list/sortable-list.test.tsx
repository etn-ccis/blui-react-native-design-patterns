import React from 'react';
import renderer from 'react-test-renderer';
import { SortableListScreen } from './SortableList';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Sortable List Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<SortableListScreen />).toJSON();
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
