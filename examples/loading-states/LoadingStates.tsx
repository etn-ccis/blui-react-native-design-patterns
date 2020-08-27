import React, { useState, useEffect } from 'react';
import { Header, wrapIcon, HeroBanner, Hero, ChannelValue, InfoListItem } from '@pxblue/react-native-components';
import { ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardData, emptyData, Device, ChannelItem } from './data/cardData';
import { getIcon, getColor, getGradeColor, getGradeIcon } from './utilities/utilities';
import { HeroPlaceholder } from './components/hero-placeholder';
import { Card } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const RefreshIcon = wrapIcon({ IconClass: MaterialIcons, name: 'refresh' });
const BatteryIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'battery-50' });
const PieIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'chart-pie' });

export const getCardContent = (device: Device): JSX.Element => {
    if (device.name === undefined || device.data === undefined) return <HeroPlaceholder />;
    return (
        <>
            <HeroBanner>
                <Hero
                    label={'Grade'}
                    IconClass={getGradeIcon(getIcon(device.data.heroValue))}
                    iconColor={getGradeColor(device.data.heroValue)}
                    iconSize={36}
                    value={device.data.heroValue.toString()}
                    units={'/100'}
                />
                <Hero
                    label={'Load'}
                    IconClass={PieIcon}
                    iconColor={getColor(device.data.loadValue)}
                    iconSize={36}
                    value={device.data.loadValue.toString()}
                    units={'%'}
                />
                <Hero
                    label={'Battery'}
                    IconClass={BatteryIcon}
                    iconColor={getColor(device.data.battery)}
                    iconSize={36}
                    value={device.data.battery.toString()}
                    units={'%'}
                />
            </HeroBanner>
            {device.data.channels.map((channel: ChannelItem, cind: number) => (
                <InfoListItem
                    key={`_c${cind}`}
                    IconClass={channel.icon}
                    title={channel.label}
                    divider={'full'}
                    rightComponent={<ChannelValue value={channel.value} units={channel.units} />}
                />
            ))}
        </>
    );
};

export const LoadingStatesScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const [data, setData] = useState(emptyData);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const refreshData = (): void => {
        setData(emptyData);
        setTimeout(() => setData(cardData), 3000);
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <Header
                testID="header"
                title={'Loading Example'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[{ icon: RefreshIcon, onPress: (): void => refreshData() }]}
            />
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {data.map((device: Device, dind: number) => (
                    // @ts-ignore new version of react-native-paper should have these type issues fixed
                    <Card key={`device${dind}`} style={{ marginBottom: 16 }}>
                        {getCardContent(device)}
                    </Card>
                ))}
            </ScrollView>
        </>
    );
};
