import React from 'react';
import renderer from 'react-test-renderer';
import { MultiselectListScreen } from './MultiselectList';
import { ListItem } from './utilities';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

const hardcodedData: ListItem[] = [
    {
        id: 1,
        name: 'item 1',
        details: 'item 1 details',
    },
    {
        id: 2,
        name: 'item 2',
        details: 'item 2 details',
    },
    {
        id: 3,
        name: 'item 3',
        details: 'item 3 details',
    },
];

describe('Multiselect List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer.create(<MultiselectListScreen hardcodedData={hardcodedData}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// @TODO implement these tests

// it('Default renders 10 items', () => {
//     const app = shallow(<DataList />);
//     expect(app.state().list.length).toBe(10);
//     expect(app.find(InfoListItem).length).toBe(10);
// });

// it('Delete an Item', () => {
//     const app = shallow(<DataList />);
//     app.instance().onSelect(1);
//     app.instance().onSelect(2);
//     app.instance().onDelete();
//     expect(app.state().list.length).toBe(8);
//     expect(app.find(InfoListItem).length).toBe(8);
// });

// it('Clear all Items', () => {
//     const app = shallow(<DataList />);
//     app.instance().onSelect(1);
//     app.instance().onSelect(2);
//     app.instance().onCancel();
//     expect(app.state().selectedItems.length).toBe(0);
//     expect(app.find(InfoListItem).length).toBe(10);
// });
