import React from 'react';
import renderer from 'react-test-renderer';
import { ComplexBottomSheetScreen } from './BottomSheet';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Complex Bottom Sheet Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<ComplexBottomSheetScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
