import React from 'react';
import renderer from 'react-test-renderer';
import { FormInAListScreen } from './FormInAList';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Password Validation Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<FormInAListScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
