import React from 'react';
import renderer from 'react-test-renderer';
import { ComplexBottomSheetScreen } from './BottomSheet';
import { sortEvents, filterEvents } from '../ComplexBottomSheet';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Complex Bottom Sheet Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<ComplexBottomSheetScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should sort by time correctly', () => {
        const data = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
            { type: 'session', date: 8, active: true, location: '', device: '', details: '' },
        ];
        const sortedTime = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'session', date: 8, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
        ];

        expect(sortEvents('time', data)).toEqual(sortedTime);
    });

    it('should sort by type correctly', () => {
        const data = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
            { type: 'session', date: 8, active: true, location: '', device: '', details: '' },
        ];
        const sortedType = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'session', date: 8, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
        ];

        expect(sortEvents('type', data)).toEqual(sortedType);
    });

    it('should filter events correctly', () => {
        const data = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
            { type: 'session', date: 8, active: true, location: '', device: '', details: '' },
        ];

        // show alarms
        const alarms = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
        ];

        // show sessions
        const sessions = [{ type: 'session', date: 8, active: true, location: '', device: '', details: '' }];

        // show settings and active alarms
        const settingsAndActive = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device: '', details: '' },
        ];

        expect(filterEvents(data, true, true, true, true)).toEqual(data);
        expect(filterEvents(data, true, true, false, false)).toEqual(alarms);
        expect(filterEvents(data, false, false, false, true)).toEqual(sessions);
        expect(filterEvents(data, true, false, true, false)).toEqual(settingsAndActive);
    });
});
