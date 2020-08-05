import React from 'react';
import renderer from 'react-test-renderer';
import { ActionListScreen, ListItem } from './ActionList';
import Modal from 'react-native-modal';
import { InfoListItem } from '@pxblue/react-native-components';
import { FlatList } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

const hardcodedData: ListItem[] = [
    {
        id: 1,
        name: 'item 1',
        details: 'item 1 details'
    },
    {
        id: 2,
        name: 'item 2',
        details: 'item 2 details'
    },
    {
        id: 3,
        name: 'item 3',
        details: 'item 3 details'
    }
]

describe('Action List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<ActionListScreen hardcodedData={hardcodedData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should render 3 items if 3 items are passed in', () => {
        const instance = renderer.create(<ActionListScreen hardcodedData={hardcodedData} />).root;
        const flatList = instance.findByType(FlatList);
        const infoListItems = flatList.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(3);
    });

    it('Should render 10 items by default', () => {
        const instance = renderer.create(<ActionListScreen />).root;
        const flatList = instance.findByType(FlatList);
        const infoListItems = flatList.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(10);
    });

    xit('Should add an Item from empty state', () => {
        const emptyData: ListItem[] = []
        const instance = render(<ActionListScreen hardcodedData={emptyData}/>);
        const addButton = instance.getByTestId("empty-state-add-button");
        fireEvent.press(addButton);

        const flatList = instance.getByTestId("list");
        const infoListItems = flatList.findByType(InfoListItem);
        expect(infoListItems).toHaveLength(1);
    });

    xit('Should add an Item', () => {
        const instance = render(<ActionListScreen />);
        const header = instance.getByTestId("header");
        const addButton = header.findAllByType("button")[2]; // just have to find the button... ahhhh!!!
        fireEvent.press(addButton)

        const flatList = instance.getByType(FlatList);
        const infoListItems = flatList.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(11);


        // const instance = renderer.create(<ActionListScreen />).root;
        // instance.props.addItem();
        // const addButton = renderer.create(<Button onPress={addItem} accessibilityStates="test">Click Me</Button>)

        // const header = instance.findByType(Header);
        // header.props.actionItems[1].handleClick();
        // const flatList = instance.findByType(FlatList);
        // const infoListItems = flatList.findAllByType(InfoListItem);
        // expect(infoListItems).toHaveLength(11);
        
        // handleClick();
        // handleClick();
        // handleClick();
        // expect(infoListItems).toHaveLength(14);
    });

    // xit('Delete an Item', () => {
    //     const app = shallow(<ActionListScreen />);
    //     app.instance().setSelectedItemIndex(2);
    //     app.instance().onDelete();
    //     expect(app.data.length).toBe(9);
    //     app.instance().setSelectedItemIndex(7);
    //     app.instance().onDelete();
    //     app.instance().setSelectedItemIndex(4);
    //     app.instance().onDelete();
    //     expect(app.data.length).toBe(7);
    // });

    // xit('Delete all Items', () => {
    //     const app = shallow(<ActionListScreen />);
    //     app.instance().deleteAll();
    //     expect(app.data.length).toBe(0);
    // });

    // xit('Modal hidden by default', () => {
    //     const app = shallow(<ActionListScreen />);
    //     expect(app.find(Modal).props().isVisible).toBe(false);
    // })

    // xit('Show modal when clicking the menu', () => {
    //     const app = shallow(<ActionListScreen />);
    //     app.instance().showModal(2);
    //     expect(app.find(Modal).props().isVisible).toBe(true);
    // })
});
