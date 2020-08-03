import React from 'react';
import renderer from 'react-test-renderer';
import { ActionListScreen } from './ActionList';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Action List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<ActionListScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
