import React from 'react';
import renderer from 'react-test-renderer';
import { SearchbarScreen } from './Searchbar';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('SearchBar Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<SearchbarScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
