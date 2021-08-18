import React from 'react';
import renderer from 'react-test-renderer';
import { FixedLengthPasscodeScreen } from './FixedLengthPasscode';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Fixed Length Passcode Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<FixedLengthPasscodeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('should display error on blur when passcode length is less than six', () => {

    // });

    // it('should verify passcode correctly', () => {

    // });

    // it('should fail passcode verification correctly', () => {

    // });

    // it('should disable passcode input field after entering a valid passcode', () => {

    // });

    // it('should reset form on "reset form" button press', () => {

    // });
});
