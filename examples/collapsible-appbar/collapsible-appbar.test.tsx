import React from 'react';
import renderer from 'react-test-renderer';
import { CollapsibleAppbarScreen } from './CollapsibleAppbar';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Collapsible Appbar Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<CollapsibleAppbarScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
