import React, { useCallback, useEffect, useState } from 'react';
import { Body1, EmptyState, H6, Header } from '@brightlayer-ui/react-native-components';
import { View, StyleSheet, ScrollView, ViewStyle, SafeAreaView, Dimensions } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { Button, useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const makeStyles = (): StyleSheet.NamedStyles<{
    section: ViewStyle;
    sectionTablet: ViewStyle;
    serialNumberFormFieldWrapper: ViewStyle;
    serialNumberErrorFormFieldWrapper: ViewStyle;
    deviceAddedView: ViewStyle;
    findDeviceButton: ViewStyle;
}> =>
    StyleSheet.create({
        section: {
            padding: 16,
            marginBottom: 32,
        },
        sectionTablet: {
            width: '100%',
            maxWidth: 480,
            alignSelf: 'center',
            paddingTop: 40,
        },
        deviceAddedView: {
            marginTop: '50%',
        },
        serialNumberFormFieldWrapper: {
            marginBottom: 24.5,
        },
        serialNumberErrorFormFieldWrapper: {
            marginBottom: 0,
        },
        findDeviceButton: {
            marginTop: 16,
            height: 36,
        },
    });

export const VerifyOnSubmitScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const theme = useTheme();
    const [dimensions, setDimensions] = useState({ window: Dimensions.get('window') });
    const [serialNumber, setSerialNumber] = useState('');
    const [shouldValidate, setShouldValidate] = useState(false);
    const [serialNumberErrorText, setSerialNumberErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deviceAdded, setDeviceAdded] = useState(false);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({ window });
        });
        // @ts-ignore
        return (): void => subscription?.remove();
    });

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const searchDevice = (text: string): void => {
        setSerialNumberErrorText('');
        setIsLoading(true);
        setTimeout((): void => {
            if (text === '123') {
                setDeviceAdded(true);
                setSerialNumberErrorText('');
            } else {
                setDeviceAdded(false);
                setSerialNumberErrorText('Device Not Found');
            }
            setIsLoading(false);
        }, 3000);
    };

    const onSerialNumberChange = useCallback((text: string) => {
        if (shouldValidate === false) setShouldValidate(true);
        setSerialNumber(text);
        setSerialNumberErrorText('');
    }, []);

    const resetForm = (): void => {
        setSerialNumber('');
        setSerialNumberErrorText('');
        setDeviceAdded(false);
        setShouldValidate(false);
    };

    const getVerifyOnSubmitView = (): JSX.Element => (
        <View style={[styles.section, dimensions.window.width < 600 ? {} : styles.sectionTablet]}>
            <H6 style={{ marginBottom: 24 }}>Find Device</H6>
            <Body1 style={{ marginBottom: 24 }}>
                For the purpose of this demonstration, serial number <Body1 font={'medium'}>123</Body1> will yield a
                successful device search.
            </Body1>
            <View
                style={
                    serialNumberErrorText !== ''
                        ? styles.serialNumberErrorFormFieldWrapper
                        : styles.serialNumberFormFieldWrapper
                }
            >
                <TextInput
                    label="Serial Number *"
                    value={serialNumber}
                    onChangeText={onSerialNumberChange}
                    keyboardType={'numeric'}
                    error={serialNumberErrorText !== '' || (!serialNumber && shouldValidate)}
                    errorText={serialNumberErrorText || undefined}
                    onBlur={(): void => {
                        if (shouldValidate === false) setShouldValidate(true);
                    }}
                />
            </View>
            <Button
                mode="contained"
                style={styles.findDeviceButton}
                labelStyle={isLoading ? { marginHorizontal: 0, fontSize: 24 } : {}}
                contentStyle={{ height: 36 }}
                onPress={(): void => searchDevice(serialNumber)}
                icon={(): JSX.Element =>
                    !isLoading ? (
                        <MatIcon name="search" color={!serialNumber ? Colors.gray[500] : Colors.white[50]} size={24} />
                    ) : (
                        <></>
                    )
                }
                disabled={!serialNumber}
                loading={isLoading}
            >
                {isLoading ? undefined : 'Find Device'}
            </Button>
        </View>
    );

    const getDeviceAddedView = (): JSX.Element => (
        <View style={styles.deviceAddedView}>
            <EmptyState
                title={'Success'}
                description={'Device "123" has been added.'}
                icon={(): JSX.Element => <MatIcon name="check-circle" color={Colors.gray[500]} size={100} />}
                actions={
                    <Button
                        icon={(): JSX.Element => <MatIcon name="add" color={Colors.blue[500]} size={24} />}
                        onPress={resetForm}
                        mode="outlined"
                    >
                        Add Another Device
                    </Button>
                }
            />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white[50] }}>
            <Header
                title={'Verify On Submit'}
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
            />
            <SafeAreaView>
                <ScrollView style={{ height: '100%' }}>
                    {deviceAdded ? getDeviceAddedView() : getVerifyOnSubmitView()}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
