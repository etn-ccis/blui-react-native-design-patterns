import React, { useState, useEffect, ComponentType } from 'react';
import {
    Header,
    wrapIcon,
    HeroBanner,
    Hero,
    ChannelValue,
    InfoListItem,
} from '@pxblue/react-native-components';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { cardData, emptyData, Device, ChannelItem } from './data/cardData';
import { getIcon, getColor, getGradeColor } from './utilities/utilities';
// @ts-ignore
import { HeroPlaceholder } from './components/hero-placeholder';
import { Card } from 'react-native-paper';
import * as PXBColors from '@pxblue/colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WrapIconProps } from '@pxblue/react-native-components/core/icon-wrapper/icon-wrapper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const RefreshIcon = wrapIcon({ IconClass: MaterialIcons, name: 'refresh' });
const BatteryIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'battery-50' }); 
const PieIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'chart-pie' }); 
const AGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-a' });
const BGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-b' }); 
const CGradeIcon = wrapIcon({ IconClass: MaterialCommunityIcons, name: 'alpha-c' }); 

const styles = StyleSheet.create({
    container: {
        margin: 4,
    },
    innerContainer: {
        paddingBottom: 8,
    },
    card: {
        margin: 8,
    }
});

export const LoadingStatesScreen: React.FC = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(emptyData);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const refreshData = (): void => {
        setData(emptyData);
        setTimeout(() => setData(cardData), 3000)
    }

    useEffect(() => {
        refreshData();
    }, []);

    const getGradeIcon = (letter: string): ComponentType<WrapIconProps> => {
        switch (letter) {
            case 'A':
                return AGradeIcon;
            case 'B':
                return BGradeIcon;
            case 'C':
                return CGradeIcon;
            default: return AGradeIcon
        }
    }

    const getCardContent = (device: Device): JSX.Element => {
        if (device.name === undefined || device.data === undefined) return <HeroPlaceholder />;
        return (
            <>
                <HeroBanner>
                    <Hero
                        label={'Grade'}
                        IconClass={
                            getGradeIcon(getIcon(device.data.heroValue))
                        }
                        iconColor={getGradeColor(device.data.heroValue)}
                        iconSize={36}
                        value={device.data.heroValue.toString()}
                        units={'/100'}
                    />
                    <Hero
                        label={'Load'}
                        IconClass={
                            PieIcon
                        }
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
                        rightComponent={
                            <ChannelValue value={channel.value} units={channel.units} />
                        }
                    />
                ))}
            </>
        );
    }

    return (
        <>
            <View
                style={{
                    backgroundColor: PXBColors.blue[500],
                    paddingTop:
                        Platform.OS === 'android' ? getStatusBarHeight(false) : 0,
                }}>
                <Header
                    expandable={false}
                    title={'Loading Example'}
                    navigation={{
                        icon: MenuIcon,
                        onPress: (): void => {
                            toggleMenu();
                        },
                    }}
                    actionItems={[
                        { icon: RefreshIcon, onPress: (): void => refreshData() },
                    ]}
                />
            </View>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.innerContainer}>
                {data.map((device: Device, dind: number) => (
                    <Card
                        key={`device${dind}`}
                        style={styles.card}
                        accessibilityStates
                        containerStyle={device.name ? { padding: 0 } : {}}
                    >
                        {getCardContent(device)}
                    </Card>
                ))}
            </ScrollView>
        </>
    );
};


