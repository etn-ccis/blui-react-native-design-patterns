import React from 'react';
import renderer from 'react-test-renderer';
import { DataListScreen } from './DataList';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Data List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<DataListScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
