import React from 'react';
import renderer from 'react-test-renderer';
import { BottomSheetScreen } from './components/BottomSheet';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Bottom Sheet Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<BottomSheetScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
