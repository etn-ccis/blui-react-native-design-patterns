import React from 'react';
import renderer from 'react-test-renderer';

import { CollapsibleAppbarScreen } from './CollapsibleAppbar';

describe('Collapsible Appbar Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<CollapsibleAppbarScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
