import React, { useState, useEffect } from 'react';
import { Header, HeroBanner, Hero, ChannelValue, InfoListItem } from '@brightlayer-ui/react-native-components';
import { ScrollView } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { cardData, emptyData, Device, ChannelItem } from './data/cardData';
import { getIcon, getColor, getGradeColor, getGradeIcon } from './utilities/utilities';
import { HeroPlaceholder } from './components/hero-placeholder';
import { Card } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export const getCardContent = (device: Device): JSX.Element => {
    if (device.name === undefined || device.data === undefined) return <HeroPlaceholder />;
    return (
        <>
            <HeroBanner>
                <Hero
                    label={'Grade'}
                    icon={<MatIcon name={getGradeIcon(getIcon(device.data.heroValue))} />}
                    iconColor={getGradeColor(device.data.heroValue)}
                    iconSize={36}
                    ChannelValueProps={{ value: device.data.heroValue.toString(), units: '/100' }}
                />
                <Hero
                    label={'Load'}
                    icon={<MatIcon name="chart-pie" />}
                    iconColor={getColor(device.data.loadValue)}
                    iconSize={36}
                    ChannelValueProps={{ value: device.data.loadValue.toString(), units: '%' }}
                />
                <Hero
                    label={'Battery'}
                    icon={<MatIcon name="battery-50" />}
                    iconColor={getColor(device.data.battery)}
                    iconSize={36}
                    ChannelValueProps={{ value: device.data.battery.toString(), units: '%' }}
                />
            </HeroBanner>
            {device.data.channels.map((channel: ChannelItem, cind: number) => (
                <InfoListItem
                    key={`_c${cind}`}
                    icon={<MatIcon name={channel.icon} />}
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
                title={'Loading States'}
                navigation={{
                    icon: <MatIcon name="menu" />,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
                actionItems={[{ icon: <MatIcon name="refresh" />, onPress: (): void => refreshData() }]}
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
