import React from 'react';
import renderer from 'react-test-renderer';
import { VerifyOnSubmitScreen } from './VerifyOnSubmit';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Verify On Submit Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<VerifyOnSubmitScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
