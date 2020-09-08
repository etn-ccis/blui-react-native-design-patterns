import React from 'react';
import renderer from 'react-test-renderer';
import { SortableListScreen } from './SortableList';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Sortable List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<SortableListScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
