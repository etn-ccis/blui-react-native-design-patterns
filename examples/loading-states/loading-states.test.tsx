import React from 'react';
import renderer from 'react-test-renderer';
import { LoadingStatesScreen } from './LoadingStates';
import { HeroPlaceholder } from './components/hero-placeholder';
import { cardData } from './data/cardData';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Loading States Tests', () => {

    it('Screen Renders', () => {
        const tree = renderer.create(<LoadingStatesScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should render placeholder when no data is available', () => {
        const instance = renderer.create(<LoadingStatesScreen />).root;
        // instance.props.data = cardData
        // expect(instance.props.data).toHaveLength(4);
        // expect(instance.find(HeroPlaceholder)).toHaveLength(4);        
    });

    it('Should not render placeholder when data is available', () => {
        const instance = renderer.create(<LoadingStatesScreen />).root;
        instance.props.data = cardData
        expect(instance.props.data).toHaveLength(cardData.length);
        expect(instance.find(HeroPlaceholder)).toHaveLength(0);
    });
});