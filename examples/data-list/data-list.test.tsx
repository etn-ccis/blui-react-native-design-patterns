import React from 'react';
import renderer from 'react-test-renderer';

import { DataListScreen } from './DataList';

describe('Data List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<DataListScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
