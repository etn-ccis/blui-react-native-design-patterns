import React, { useCallback, useEffect, useState } from 'react';
import { Body1, Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet, ScrollView, ViewStyle, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { Button, Divider } from 'react-native-paper';
import * as Colors from '@pxblue/colors';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const RefreshIcon = wrapIcon({ IconClass: MaterialIcons, name: 'refresh' });

const makeStyles = (): StyleSheet.NamedStyles<{
    section: ViewStyle;
    sectionTablet: ViewStyle;
    topDivider: ViewStyle;
    passcodeFormFieldWrapper: ViewStyle;
    passcodeErrorFormFieldWrapper: ViewStyle;
    resetFormButton: ViewStyle;
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
        topDivider: {
            marginTop: 40,
            marginBottom: 32,
            marginHorizontal: -16,
        },
        passcodeFormFieldWrapper: {
            marginBottom: 24.5,
        },
        passcodeErrorFormFieldWrapper: {
            marginBottom: 0,
        },
        resetFormButton: {
            marginTop: 16,
        },
    });

export const FixedLengthPasscodeScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const [dimensions, setDimensions] = useState({ window: Dimensions.get('window') });
    const [passcode, setPasscode] = useState('');
    const [passcodeErrorText, setPasscodeErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passcodeSubmitted, setPasscodeSubmitted] = useState(false);
    const [passcodeSuccess, setPasscodeSuccess] = useState(false);
    const [shouldValidate, setShouldValidate] = useState(false);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({ window });
        });
        return (): void => subscription?.remove();
    });

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const validatePasscode = useCallback((value: string): void => {
        const tempPasscode = value;
        let tempPasscodeError = '';
        if (tempPasscode.trim().length < 6) {
            tempPasscodeError = 'Please enter a six-digit-passcode';
        }
        setPasscodeErrorText(tempPasscodeError);
    }, []);

    const verifyPasscode = (text: string): void => {
        setPasscodeErrorText('');
        setIsLoading(true);
        setTimeout((): void => {
            if (text === '123456') {
                setPasscodeSuccess(true);
                setPasscodeErrorText('');
            } else {
                setPasscodeSuccess(false);
                setPasscodeErrorText('Invalid Passcode');
            }
            setPasscodeSubmitted(true);
            setIsLoading(false);
        }, 3000);
    };

    const onPasscodeChange = useCallback(
        (text: string) => {
            setPasscode(text);
            if (shouldValidate) validatePasscode(text);
            if (text.length === 6) verifyPasscode(text);
        },
        [validatePasscode, shouldValidate, verifyPasscode]
    );

    const onPasscodeBlur = useCallback((): void => {
        setShouldValidate(true);
        validatePasscode(passcode);
    }, [validatePasscode, passcode]);

    const resetForm = (): void => {
        setPasscode('');
        setPasscodeErrorText('');
        setPasscodeSubmitted(false);
        setPasscodeSuccess(false);
        setShouldValidate(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white[50] }}>
            <Header
                title={'Fixed Length Passcode'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
            />
            <SafeAreaView>
                <ScrollView>
                    <View style={[styles.section, dimensions.window.width < 600 ? {} : styles.sectionTablet]}>
                        <Body1>
                            Please enter the <Body1 font={'medium'}>six-digit passcode</Body1> we just send to you. The
                            passcode is valid for 15 minutes.
                        </Body1>
                        <Body1 style={{ marginTop: 8 }}>
                            For the purpose of this demonstration, passcode <Body1 font={'medium'}>123456</Body1> will
                            pass. Any other 6 digit passcode will fail.
                        </Body1>
                        <Divider style={styles.topDivider} />
                        <View
                            style={
                                passcodeErrorText !== ''
                                    ? styles.passcodeErrorFormFieldWrapper
                                    : styles.passcodeFormFieldWrapper
                            }
                        >
                            <TextInput
                                label="Passcode *"
                                value={passcode}
                                onChangeText={onPasscodeChange}
                                keyboardType={'numeric'}
                                error={passcodeErrorText !== ''}
                                errorText={passcodeErrorText}
                                onBlur={onPasscodeBlur}
                                rightIcon={{
                                    name: !isLoading && passcodeSubmitted && passcodeSuccess ? 'check' : undefined,
                                    color:
                                        !isLoading && passcodeSubmitted && passcodeSuccess
                                            ? Colors.green[500]
                                            : undefined,
                                }}
                                rightText={{
                                    text: isLoading ? 'verifying...' : '',
                                    style: { color: isLoading ? Colors.gray[500] : '' },
                                }}
                                maxLength={6}
                                disabled={isLoading || (passcodeSubmitted && passcodeSuccess)}
                            />
                        </View>
                        <Button
                            mode="outlined"
                            style={styles.resetFormButton}
                            onPress={resetForm}
                            icon={(): JSX.Element => <RefreshIcon color={Colors.blue[500]} size={24} />}
                        >
                            Reset Form
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
