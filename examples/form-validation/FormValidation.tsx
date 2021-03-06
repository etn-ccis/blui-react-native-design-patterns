import React, { useCallback, useState } from 'react';
import { Body1, H6, Header, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { InputIconType, TextInput } from './TextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { PasswordRequirement, passwordRequirements, PasswordRequirements } from './PasswordRequirements';
import { useTheme } from 'react-native-paper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

export const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
export const PHONE_NUMBER_REGEX = new RegExp(/^((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})$/);

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
            marginBottom: 24,
        },
        formFieldWrapper: {
            marginBottom: 24,
        },
        passwordRequirements: {
            paddingBottom: 32,
        },
    });

export const FormValidationScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const theme = useTheme();
    const [input, setInput] = useState('');
    const [inputErrorText, setInputErrorText] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
    const [chars, setChars] = useState('');
    const charsLimit = 30;
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordErrorText, setOldPasswordErrorText] = useState('');
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [hasNewPasswordError, setHasNewPasswordError] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const getValidationIcon = (error: boolean, value?: string): InputIconType => {
        if (error) {
            return {
                name: 'close',
                color: theme.colors.error,
            };
        } else if (value && !error) {
            return {
                name: 'check',
                color: theme.colors.primary,
            };
        }
        return {};
    };

    const validateInput = useCallback(
        (value: string): void => {
            const tempInput = value;
            let tempInputError = '';
            if (!tempInput.trim()) {
                tempInputError = 'required';
            }
            setInputErrorText(tempInputError);
        },
        [setInputErrorText]
    );

    const onInputChange = useCallback(
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
            } else if (!EMAIL_REGEX.test(tempEmail)) {
                tempEmailError = 'Invalid email address';
            }
            setEmailErrorText(tempEmailError);
        },
        [setEmailErrorText]
    );

    const onEmailChange = useCallback(
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
            } else if (!PHONE_NUMBER_REGEX.test(tempPhoneNumber)) {
                tempPhoneNumberError = 'Invalid phone number';
            }
            setPhoneNumberErrorText(tempPhoneNumberError);
        },
        [setPhoneNumberErrorText]
    );

    const onPhoneNumberChange = useCallback(
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

    const onCharsChange = useCallback(
        (text: string) => {
            setChars(text);
        },
        [setChars]
    );

    const validateOldPassword = useCallback(
        (value: string): void => {
            const tempOldPassword = value;
            let tempOldPasswordError = '';
            if (!tempOldPassword.trim()) {
                tempOldPasswordError = 'required';
            }
            setOldPasswordErrorText(tempOldPasswordError);
        },
        [setOldPasswordErrorText]
    );

    const onOldPasswordChange = useCallback(
        (text: string) => {
            setOldPassword(text);
            validateOldPassword(text);
        },
        [setOldPassword, validateOldPassword]
    );

    const onOldPasswordBlur = useCallback((): void => {
        validateOldPassword(oldPassword);
    }, [validateOldPassword, oldPassword]);

    const validateNewPassword = useCallback(
        (value: string): void => {
            const tempNewPassword = value;
            let tempNewPasswordError = false;
            setHasNewPasswordError(false);

            passwordRequirements.forEach((requirement: PasswordRequirement) => {
                if (!requirement.regex.test(tempNewPassword)) {
                    tempNewPasswordError = true;
                }
            });

            setHasNewPasswordError(tempNewPasswordError);
        },
        [setHasNewPasswordError]
    );

    const onNewPasswordChange = useCallback(
        (text: string) => {
            setNewPassword(text);
            validateNewPassword(text);
        },
        [setNewPassword, validateNewPassword]
    );

    const onNewPasswordBlur = useCallback((): void => {
        validateNewPassword(newPassword);
    }, [validateNewPassword, newPassword]);

    const validateConfirmPassword = useCallback(
        (value: string): void => {
            const tempConfirmPassword = value;
            let tempConfirmPasswordError = '';
            if (!tempConfirmPassword.trim()) {
                tempConfirmPasswordError = 'required';
            } else if (tempConfirmPassword !== newPassword) {
                tempConfirmPasswordError = 'passwords do not match';
            }
            setConfirmPasswordErrorText(tempConfirmPasswordError);
        },
        [setConfirmPasswordErrorText, newPassword]
    );

    const onConfirmPasswordChange = useCallback(
        (text: string) => {
            setConfirmPassword(text);
            validateConfirmPassword(text);
        },
        [setConfirmPassword, validateConfirmPassword]
    );

    const onConfirmPasswordBlur = useCallback((): void => {
        validateConfirmPassword(confirmPassword);
    }, [validateConfirmPassword, confirmPassword]);

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
                            label="Input*"
                            value={input}
                            onChangeText={onInputChange}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            helperText={'This is a regular input field.'}
                            error={inputErrorText !== ''}
                            errorText={inputErrorText}
                            onBlur={onInputBlur}
                            rightIcon={getValidationIcon(inputErrorText !== '', input)}
                        />
                    </View>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Enter Your Email*"
                            style={styles.formField}
                            value={email}
                            onChangeText={onEmailChange}
                            returnKeyType={'next'}
                            keyboardType={'email-address'}
                            helperText={'This field throws an error if the email format is incorrect.'}
                            error={emailErrorText !== ''}
                            errorText={emailErrorText}
                            onBlur={onEmailBlur}
                            rightIcon={getValidationIcon(emailErrorText !== '', email)}
                        />
                    </View>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Phone Number*"
                            style={styles.formField}
                            value={phoneNumber}
                            onChangeText={onPhoneNumberChange}
                            returnKeyType={'next'}
                            keyboardType={'phone-pad'}
                            helperText={
                                'This field throws an error if the phone number format is incorrect. (Needs to be a valid U.S. number)'
                            }
                            error={phoneNumberErrorText !== ''}
                            errorText={phoneNumberErrorText}
                            onBlur={onPhoneNumberBlur}
                            rightIcon={getValidationIcon(phoneNumberErrorText !== '', phoneNumber)}
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
                            onChangeText={onCharsChange}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            helperText={`Max ${charsLimit} characters`}
                            helperTextRight={`${chars.length}/${charsLimit}`}
                            maxLength={charsLimit}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <H6 style={styles.title}>Password Validation</H6>
                    <Body1 style={styles.info}>
                        The following example shows how to enforce password strength restrictions and confirmation field
                        matching. The password strength requirements for your application may differ from this example.
                    </Body1>
                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Old Password*"
                            style={styles.formField}
                            value={oldPassword}
                            onChangeText={onOldPasswordChange}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            error={oldPasswordErrorText !== ''}
                            errorText={oldPasswordErrorText}
                            onBlur={onOldPasswordBlur}
                            secureTextEntry={!isOldPasswordVisible}
                            rightIcon={{
                                name: !isOldPasswordVisible ? 'eye-off' : 'eye',
                                onPress: (): void => setIsOldPasswordVisible(!isOldPasswordVisible),
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            label="New Password*"
                            style={styles.formField}
                            value={newPassword}
                            onChangeText={onNewPasswordChange}
                            returnKeyType={'next'}
                            keyboardType={'default'}
                            error={hasNewPasswordError}
                            onBlur={onNewPasswordBlur}
                            secureTextEntry={!isNewPasswordVisible}
                            rightIcon={{
                                name: !isNewPasswordVisible ? 'eye-off' : 'eye',
                                onPress: (): void => setIsNewPasswordVisible(!isNewPasswordVisible),
                            }}
                        />
                    </View>

                    <PasswordRequirements style={styles.passwordRequirements} passwordText={newPassword} />

                    <View style={styles.formFieldWrapper}>
                        <TextInput
                            label="Confirm Password*"
                            style={styles.formField}
                            value={confirmPassword}
                            onChangeText={onConfirmPasswordChange}
                            returnKeyType={'done'}
                            keyboardType={'default'}
                            error={confirmPasswordErrorText !== ''}
                            errorText={confirmPasswordErrorText}
                            onBlur={onConfirmPasswordBlur}
                            secureTextEntry={!isConfirmPasswordVisible}
                            rightIcon={{
                                name: !isConfirmPasswordVisible ? 'eye-off' : 'eye',
                                onPress: (): void => setIsConfirmPasswordVisible(!isConfirmPasswordVisible),
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
