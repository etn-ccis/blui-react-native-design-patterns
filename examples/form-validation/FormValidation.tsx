import React, { useCallback, useState } from 'react';
import { Body1, H6, Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from './TextInput';
import { ScrollView } from 'react-native-gesture-handler';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

export const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
export const phoneNumberRegex = new RegExp(/^((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})$/);
// export const upperCharRegex = new RegExp(/[A-Z]+/);
// export const lowerCharRegex = new RegExp(/[a-z]+/);
// export const numberRegex = new RegExp(/[0-9]+/);
// export const splCharRegex = new RegExp(/(!|@|#|\$|\^|&)+/);

const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        content: {
            marginBottom: 128,
        },
        section: {
            padding: 16,
            marginBottom: 32,
        },
        title: {
            marginBottom: 16,
        },
        info: {
            marginBottom: 16,
        },
        formFieldWrapper: {
            marginBottom: 32,
        },
    });

export const FormValidationScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const [input, setInput] = useState('');
    const [inputErrorText, setInputErrorText] = useState('');
    const [hasInputError, setHasInputError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
    const [hasPhoneNumberError, setHasPhoneNumberError] = useState(false);
    const [chars, setChars] = useState('');
    const [charsCount, setCharsCount] = useState(0);
    const charsLimit = 30;

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const validateInput = useCallback(
        (value: string): void => {
            const tempInput = value;
            let tempInputError = '';
            if (!tempInput.trim()) {
                tempInputError = 'required';
            }
            setInputErrorText(tempInputError);
            setHasInputError(!tempInput.trim() ? true : false);
        },
        [setInputErrorText, setHasInputError]
    );

    const onInputChange: any = useCallback(
        (text: string) => {
            setInput(text);
            validateInput(text);
        },
        [setInput, validateInput]
    );

    const onInputBlur = useCallback((): void => {
        validateInput(input);
    }, [validateInput, input]);

    const validateEmail = useCallback(
        (value: string): void => {
            const tempEmail = value;
            let tempEmailError = '';
            if (!tempEmail.trim()) {
                tempEmailError = 'required';
            } else if (!emailRegex.test(tempEmail)) {
                tempEmailError = 'Invalid email address';
            }
            setEmailErrorText(tempEmailError);
            setHasEmailError(!tempEmail.trim() || !emailRegex.test(tempEmail) ? true : false);
        },
        [setEmailErrorText, setHasEmailError]
    );

    const onEmailChange: any = useCallback(
        (text: string) => {
            setEmail(text);
            validateEmail(text);
        },
        [setEmail, validateEmail]
    );

    const onEmailBlur = useCallback((): void => {
        validateEmail(email);
    }, [validateEmail, email]);

    const validatePhoneNumber = useCallback(
        (value: string): void => {
            const tempPhoneNumber = value;
            let tempPhoneNumberError = '';
            if (!tempPhoneNumber.trim()) {
                tempPhoneNumberError = 'required';
            } else if (!phoneNumberRegex.test(tempPhoneNumber)) {
                tempPhoneNumberError = 'Invalid phone number';
            }
            setPhoneNumberErrorText(tempPhoneNumberError);
            setHasPhoneNumberError(!tempPhoneNumber.trim() || !phoneNumberRegex.test(tempPhoneNumber) ? true : false);
        },
        [setPhoneNumberErrorText, setHasPhoneNumberError]
    );

    const onPhoneNumberChange: any = useCallback(
        (text: string) => {
            let value = text;
            value = value.replace(/[a-zA-Z]+/, '');
            setPhoneNumber(value);
            validatePhoneNumber(value);
        },
        [setPhoneNumber, validatePhoneNumber]
    );

    const onPhoneNumberBlur = useCallback((): void => {
        validatePhoneNumber(phoneNumber);
    }, [validateEmail, phoneNumber]);

    const onCharsChange: any = useCallback(
        (text: string) => {
            setChars(text.substring(0, charsLimit));
            setCharsCount(text.substring(0, charsLimit).length);
        },
        [setChars, setCharsCount]
    );

    return (
        <View>
            <Header
                title={'Form Validation'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
            />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <H6 style={styles.title}>Basic Form Fields</H6>
                    <Body1 style={styles.info}>
                        The following examples show how to perform validation on various input types. The error icon on
                        invalid inputs is optional, but adds redundancy for color blind users.
                    </Body1>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Input"
                            value={input}
                            onChangeText={(text): any => onInputChange(text)}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            helperText={'This is a regular input field.'}
                            error={hasInputError}
                            errorText={inputErrorText}
                            onBlur={(): void => {
                                onInputBlur();
                            }}
                        />
                    </View>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Enter Your Email"
                            style={styles.formField}
                            value={email}
                            onChangeText={(text): any => onEmailChange(text)}
                            returnKeyType={'next'}
                            keyboardType={'email-address'}
                            helperText={'This field throws an error if the email format is incorrect.'}
                            error={hasEmailError}
                            errorText={emailErrorText}
                            onBlur={(): void => {
                                onEmailBlur();
                            }}
                        />
                    </View>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Phone Number"
                            style={styles.formField}
                            helperStyles={{ bottom: -40 }}
                            value={phoneNumber}
                            onChangeText={(text): any => onPhoneNumberChange(text)}
                            returnKeyType={'next'}
                            keyboardType={'phone-pad'}
                            helperText={
                                'This field throws an error if the phone number format is incorrect. (Needs to be a valid U.S. number)'
                            }
                            error={hasPhoneNumberError}
                            errorText={phoneNumberErrorText}
                            onBlur={(): void => {
                                onPhoneNumberBlur();
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <H6 style={styles.title}>Character Limits</H6>
                    <Body1 style={styles.info}>
                        The following example shows how to restrict the length of an input field. In these cases, you
                        should provide the user an indication of how many characters are available.
                    </Body1>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Enter Some Text"
                            value={chars}
                            onChangeText={(text): any => onCharsChange(text)}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            helperText={'Max 30 characters'}
                            helperTextRight={`${charsCount}/${charsLimit}`}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
