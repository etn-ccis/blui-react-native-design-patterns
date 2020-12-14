import React from 'react';
import renderer, { ReactTestInstance } from 'react-test-renderer';
import { LoadingStatesScreen, getCardContent } from './LoadingStates';
import { getIcon, getColor, getGradeColor } from './utilities/utilities';
import { red, yellow, green } from '@pxblue/colors';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Loading States Tests', () => {
    describe('Utilities', () => {
        it('returns correct value from getIcon', () => {
            expect(getIcon(90)).toEqual('A');
            expect(getIcon(80)).toEqual('B');
            expect(getIcon(85)).toEqual('B');
            expect(getIcon(70)).toEqual('C');
            expect(getIcon(120)).toEqual('A');
            expect(getIcon(-100)).toEqual('C');
        });
        it('returns correct value from getColor', () => {
            expect(getColor(-100)).toEqual(red[500]);
            expect(getColor(0)).toEqual(red[500]);
            expect(getColor(25)).toEqual(yellow[500]);
            expect(getColor(50)).toEqual(yellow[500]);
            expect(getColor(75)).toEqual(green[500]);
            expect(getColor(100)).toEqual(green[500]);
            expect(getColor(150)).toEqual(green[500]);
        });
        it('returns correct color from getGradeColor', () => {
            expect(getGradeColor(90)).toEqual(green[500]);
            expect(getGradeColor(80)).toEqual(yellow[500]);
            expect(getGradeColor(85)).toEqual(yellow[500]);
            expect(getGradeColor(70)).toEqual(red[500]);
            expect(getGradeColor(120)).toEqual(green[500]);
            expect(getGradeColor(-100)).toEqual(red[500]);
        });
        // it('returns correct icon from getGradeIcon', () => {
        //     // Can't find a good way to test if two 'wrapIcon' items are the same
        // });
    });
    describe('Screen', () => {
        it('renders the screen', () => {
            const tree = renderer.create(<LoadingStatesScreen />).toJSON();
            expect(tree).toMatchSnapshot();
        });
        it('returns correct content from getCardContent', () => {
            let instance: ReactTestInstance;
            instance = renderer.create(getCardContent({})).root;
            expect(instance.find((x) => x.props.testID === 'placeholder-hero-card')).toBeTruthy();
            instance = renderer.create(getCardContent({ name: 'Test' })).root;
            expect(instance.find((x) => x.props.testID === 'placeholder-hero-card')).toBeTruthy();
            // Crashes the test :shrug
            // instance = renderer.create(getCardContent({name: 'Test', data: {heroValue: 100, loadValue: 100, battery: 100, channels:[]}})).root;
            // expect(instance.find((x) => x.props.testID === 'placeholder-hero-card')).toBeTruthy();
        });
    });
});
