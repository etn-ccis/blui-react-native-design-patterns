import React, { useCallback, useEffect, useState } from 'react';
import { Header, InfoListItem } from '@brightlayer-ui/react-native-components';
import { View, StyleSheet, ViewStyle, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { Card, Switch, useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const makeStyles = (): StyleSheet.NamedStyles<{
    cardWrapper: ViewStyle;
    cardWrapperTablet: ViewStyle;
    card: ViewStyle;
    cardTablet: ViewStyle;
    textInput: ViewStyle;
}> =>
    StyleSheet.create({
        cardWrapper: {
            alignItems: 'center',
        },
        cardWrapperTablet: {
            marginTop: 24,
        },
        card: {
            marginBottom: 8,
            width: '100%',
        },
        cardTablet: {
            maxWidth: 600,
            borderRadius: 4,
            overflow: 'hidden', // this is necessary for border radius styles to be applied
        },
        textInput: {
            height: 40,
            width: 136,
        },
    });

export const FormInAListScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const theme = useTheme();
    const [dimensions, setDimensions] = useState({ window: Dimensions.get('window') });
    const [ipAddress, setIPAddress] = useState('10.0.0.1');
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({ window });
        });
        return (): void => subscription?.remove();
    });

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const onIPAddressChange = useCallback((text: string) => {
        setIPAddress(text);
    }, []);

    const onSwitchToggle = (): void => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={{ flex: 1 }}>
            <Header
                title={'In A List'}
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
            />
            <SafeAreaView>
                <ScrollView>
                    <View style={[styles.cardWrapper, dimensions.window.width < 600 ? {} : styles.cardWrapperTablet]}>
                        <Card style={[styles.card, dimensions.window.width < 600 ? {} : styles.cardTablet]}>
                            <InfoListItem
                                title={'IP Address'}
                                icon={<MatIcon name="dns" />}
                                divider={'partial'}
                                backgroundColor={Colors.white[50]}
                                rightComponent={
                                    <TextInput
                                        value={ipAddress}
                                        onChangeText={onIPAddressChange}
                                        style={styles.textInput}
                                    />
                                }
                            />
                            <InfoListItem
                                title={'Insight Report'}
                                subtitle={'Auto-report every 2 months'}
                                icon={<MatIcon name="insights" />}
                                backgroundColor={Colors.white[50]}
                                rightComponent={<Switch value={isSwitchOn} onValueChange={onSwitchToggle} />}
                            />
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
