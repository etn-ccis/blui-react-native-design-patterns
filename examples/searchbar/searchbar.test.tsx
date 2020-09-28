import React from 'react';
import renderer from 'react-test-renderer';
import { SearchbarScreen } from './Searchbar';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('SearchBar Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<SearchbarScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
