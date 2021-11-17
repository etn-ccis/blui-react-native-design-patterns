import React, { useState, useEffect } from 'react';
import { Header, HeroBanner, Hero, ChannelValue, InfoListItem } from '@brightlayer-ui/react-native-components';
import { ScrollView } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { cardData, emptyData, Device, ChannelItem } from './data/cardData';
import { getIcon, getColor, getGradeColor, getGradeIcon } from './utilities/utilities';
import { HeroPlaceholder } from './components/hero-placeholder';
import { Card, useTheme } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Theme } from 'react-native-paper/lib/typescript/types';
import BLUIIcon from '@brightlayer-ui/react-native-vector-icons';

export const getCardContent = (device: Device, theme: Theme): JSX.Element => {
    if (device.name === undefined || device.data === undefined) return <HeroPlaceholder />;
    return (
        <>
            <HeroBanner>
                <Hero
                    label={'Grade'}
                    icon={<BLUIIcon name={getGradeIcon(getIcon(device.data.heroValue))} />}
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
                    icon={<MatIcon name={channel.icon} color={theme.colors.text} size={24} />}
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
    const theme = useTheme();
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
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
                actionItems={[
                    {
                        icon: <MatIcon name="refresh" color={theme.colors.textPalette.onPrimary.main} size={24} />,
                        onPress: (): void => refreshData(),
                    },
                ]}
            />
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {data.map((device: Device, dind: number) => (
                    // @ts-ignore new version of react-native-paper should have these type issues fixed
                    <Card key={`device${dind}`} style={{ marginBottom: 16 }}>
                        {getCardContent(device, theme)}
                    </Card>
                ))}
            </ScrollView>
        </>
    );
};
