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
});
