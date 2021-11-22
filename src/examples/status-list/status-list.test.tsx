import React from 'react';
import renderer from 'react-test-renderer';
import { StatusListScreen } from './StatusList';
import { InfoListItemProps, InfoListItem } from '@brightlayer-ui/react-native-components';
import { FlatList } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        statusColor: 'red',
        icon: <MatIcon name="notifications" size={24} color={'white'} />,
    },
    {
        title: 'Item 2',
        subtitle: 'Subtitle 2',
        statusColor: 'transparent',
        icon: <MatIcon name="notifications" size={24} color={'red'} />,
    },
    {
        title: 'Item 3',
        subtitle: 'Subtitle 3',
        statusColor: '#000000',
    },
    {
        title: 'Item 4',
        subtitle: 'Subtitle 4',
        avatar: false,
    },
    {
        title: 'Item 5',
    },
];

describe('Status List Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <StatusListScreen hardcodedData={hardcodedData} navigation={navigationMock} />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('Should render 10 items by default', () => {
    //     const instance = renderer.create(
    //         <ThemeProvider theme={BLUIThemes.blue}>
    //             <SafeAreaProvider>
    //                 <StatusListScreen navigation={navigationMock} />
    //             </SafeAreaProvider>
    //         </ThemeProvider>
    //     ).root;
    //     const flatList = instance.findByType(FlatList);
    //     const infoListItems = flatList.findAllByType(InfoListItem);
    //     expect(infoListItems).toHaveLength(10);
    // });

    // it('Should render 5 items if 5 items are passed in', () => {
    //     const instance = renderer.create(
    //         <ThemeProvider theme={BLUIThemes.blue}>
    //             <SafeAreaProvider>
    //                 <StatusListScreen hardcodedData={hardcodedData} navigation={navigationMock} />
    //             </SafeAreaProvider>
    //         </ThemeProvider>
    //     ).root;
    //     const flatList = instance.findByType(FlatList);
    //     const infoListItems = flatList.findAllByType(InfoListItem);
    //     expect(infoListItems).toHaveLength(5);
    // });
});
