import React, { useCallback, useState } from 'react';
import { Body1, Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet, ScrollView, ViewStyle, TextStyle, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { ActivityIndicator, Button, Divider } from 'react-native-paper';
import * as Colors from '@pxblue/colors';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const RefreshIcon = wrapIcon({ IconClass: MaterialIcons, name: 'refresh' });
const DoneIcon = wrapIcon({ IconClass: MaterialIcons, name: 'done' });

const makeStyles = (): StyleSheet.NamedStyles<{
    section: ViewStyle;
    topDivider: ViewStyle;
    passcodeFormFieldWrapper: TextStyle;
    passcodeErrorFormFieldWrapper: TextStyle;
    resetFormButton: ViewStyle;
}> =>
    StyleSheet.create({
        section: {
            padding: 16,
            marginBottom: 32,
        },
        topDivider: {
            marginTop: 24,
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
            marginTop: 16
        },
    });

export const FixedLengthPasscodeScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const [passcode, setPasscode] = useState('');
    const [passcodeErrorText, setPasscodeErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passcodeSubmitted, setPasscodeSubmitted] = useState(false);
    const [passcodeSuccess, setPasscodeSuccess] = useState(false);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const validatePasscode = useCallback(
        (value: string): void => {
            const tempPasscode = value;
            let tempPasscodeError = '';
            if (!tempPasscode.trim()) {
                tempPasscodeError = 'Please enter a six-digit-passcode';
            }
            if (passcodeSubmitted && !passcodeSuccess) {
                tempPasscodeError = 'Invalid Passcode';
            }
            setPasscodeErrorText(tempPasscodeError);
        },
        [setPasscodeErrorText]
    );

    const verifyPasscode = (text: string): void => {
        // eslint-disable-next-line no-console
                console.log(text);
        setIsLoading(true);
        setTimeout((): void => {
            if (passcode === '123456') {
                 // eslint-disable-next-line no-console
                console.log('setting to true');
                setPasscodeSuccess(true);
            }
            setPasscodeSubmitted(true);
            setIsLoading(false);
            validatePasscode(text);
        }, 3000);
    };

    const onPasscodeChange = useCallback(
        (text: string) => {
            setPasscode(text);
            validatePasscode(text);

            if (text.length === 6) {
                verifyPasscode((text));
            }
        },
        [setPasscode, validatePasscode]
    );

    const onPasscodeBlur = useCallback((): void => {
        validatePasscode(passcode);
    }, [validatePasscode, passcode]);

    // const getPasscodeRightIcon = useCallback((): React.ReactNode => {
    //     if (isLoading) {
    //         return <ActivityIndicator animating={true} color={Colors.blue[500]} size={20} />;
    //     }
    //     if (!isLoading && passcodeSubmitted && passcodeSuccess) {
    //         return <DoneIcon color={Colors.green[500]} size={20} />;
    //     }
    // }, [isLoading, passcodeSubmitted, passcodeSuccess]);

    const resetForm = (): void => {
        setPasscode('');
        setPasscodeErrorText('');
        setPasscodeSubmitted(false);
        setPasscodeSuccess(false);
    }

    return (
        <View style={{ flex: 1 }}>
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
                    <View style={styles.section}>
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
                                returnKeyType={'next'}
                                keyboardType={'numeric'}
                                error={passcodeErrorText !== ''}
                                errorText={passcodeErrorText}
                                onBlur={onPasscodeBlur}
                                rightIcon={isLoading ? <ActivityIndicator animating={true} color={Colors.blue[500]} size={20} /> : !isLoading && passcodeSubmitted && passcodeSuccess ? <DoneIcon color={Colors.green[500]} size={20} /> : <></>}
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
