import React from 'react';
import renderer from 'react-test-renderer';
import { StatusListScreen } from './StatusList';
import { InfoListItemProps, InfoListItem, wrapIcon } from '@pxblue/react-native-components';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationIcon = wrapIcon({ IconClass: MaterialIcons, name: 'notifications' });

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));
const navigationMock: any = {
    navigate: (): void => {
        /* do nothing */
    },
};

const hardcodedData: InfoListItemProps[] = [
    {
        title: 'Item 1',
        subtitle: 'Subtitle 1',
        iconColor: 'white',
        statusColor: 'red',
        IconClass: NotificationIcon,
    },
    {
        title: 'Item 2',
        subtitle: 'Subtitle 2',
        iconColor: 'red',
        statusColor: 'transparent',
        IconClass: NotificationIcon,
    },
    {
        title: 'Item 3',
        subtitle: 'Subtitle 3',
        iconColor: 'rgba(255,255,255,0.5)',
        statusColor: '#000000',
    },
    {
        title: 'Item 4',
        subtitle: 'Subtitle 4',
        iconColor: 'purple',
        avatar: false,
    },
    {
        title: 'Item 5',
    },
];

describe('Status List Tests', () => {
    it('Screen Renders', () => {
        const tree = renderer
            .create(<StatusListScreen hardcodedData={hardcodedData} navigation={navigationMock} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should render 10 items by default', () => {
        const instance = renderer.create(<StatusListScreen navigation={navigationMock} />).root;
        const flatList = instance.findByType(FlatList);
        const infoListItems = flatList.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(10);
    });

    it('Should render 5 items if 5 items are passed in', () => {
        const instance = renderer.create(<StatusListScreen hardcodedData={hardcodedData} navigation={navigationMock} />)
            .root;
        const flatList = instance.findByType(FlatList);
        const infoListItems = flatList.findAllByType(InfoListItem);
        expect(infoListItems).toHaveLength(5);
    });
});
