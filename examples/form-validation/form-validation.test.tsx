import React from 'react';
import renderer from 'react-test-renderer';
import { FormValidationScreen } from './FormValidation';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Form Validation Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<FormValidationScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
