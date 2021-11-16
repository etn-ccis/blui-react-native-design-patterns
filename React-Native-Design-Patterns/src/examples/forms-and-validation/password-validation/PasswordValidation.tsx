import React, { useCallback, useState } from 'react';
import { Body1, Header } from '@brightlayer-ui/react-native-components';
import { View, StyleSheet, ScrollView, ViewStyle, SafeAreaView } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { PasswordRequirement, passwordRequirements, PasswordRequirements } from './PasswordRequirements';
import { Button, Divider, useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const makeStyles = (): StyleSheet.NamedStyles<{
    section: ViewStyle;
    topDivider: ViewStyle;
    currentPasswordFormFieldWrapper: ViewStyle;
    currentPasswordErrorFormFieldWrapper: ViewStyle;
    newPasswordFormFieldWrapper: ViewStyle;
    passwordRequirements: ViewStyle;
    confirmPasswordFormFieldWrapper: ViewStyle;
    confirmPasswordErrorFormFieldWrapper: ViewStyle;
    buttonContainer: ViewStyle;
    bottomDivider: ViewStyle;
    submitButton: ViewStyle;
}> =>
    StyleSheet.create({
        section: {
            padding: 16,
            marginBottom: 32,
        },
        topDivider: {
            marginTop: 40,
            marginBottom: 32,
            marginHorizontal: -16,
        },
        currentPasswordFormFieldWrapper: {
            marginBottom: 24.5,
        },
        currentPasswordErrorFormFieldWrapper: {
            marginBottom: 0,
        },
        newPasswordFormFieldWrapper: {
            marginTop: 27,
            marginBottom: 8,
        },
        passwordRequirements: {
            marginBottom: 32,
        },
        confirmPasswordFormFieldWrapper: {
            marginBottom: 24.5,
        },
        confirmPasswordErrorFormFieldWrapper: {
            marginBottom: 0,
        },
        buttonContainer: {
            position: 'relative',
            bottom: 0,
            left: 0,
            right: 0,
        },
        bottomDivider: {
            marginHorizontal: -16,
        },
        submitButton: {
            margin: 16,
        },
    });

export const PasswordValidationScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const theme = useTheme();
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordErrorText, setCurrentPasswordErrorText] = useState('');
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [hasNewPasswordError, setHasNewPasswordError] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const validateCurrentPassword = useCallback((value: string): void => {
        const tempCurrentPassword = value;
        let tempCurrentPasswordError = '';
        if (!tempCurrentPassword.trim()) {
            tempCurrentPasswordError = 'required';
        }
        setCurrentPasswordErrorText(tempCurrentPasswordError);
    }, []);

    const onCurrentPasswordChange = useCallback(
        (text: string) => {
            setCurrentPassword(text);
            validateCurrentPassword(text);
        },
        [validateCurrentPassword]
    );

    const onCurrentPasswordBlur = useCallback((): void => {
        validateCurrentPassword(currentPassword);
    }, [validateCurrentPassword, currentPassword]);

    const validateNewPassword = useCallback((value: string): void => {
        const tempNewPassword = value;
        let tempNewPasswordError = false;
        setHasNewPasswordError(false);

        passwordRequirements.forEach((requirement: PasswordRequirement) => {
            if (!requirement.regex.test(tempNewPassword)) {
                tempNewPasswordError = true;
            }
        });

        setHasNewPasswordError(tempNewPasswordError);
    }, []);

    const onNewPasswordChange = useCallback(
        (text: string) => {
            setNewPassword(text);
            validateNewPassword(text);
        },
        [validateNewPassword]
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
        [newPassword]
    );

    const onConfirmPasswordChange = useCallback(
        (text: string) => {
            setConfirmPassword(text);
            validateConfirmPassword(text);
        },
        [validateConfirmPassword]
    );

    const onConfirmPasswordBlur = useCallback((): void => {
        validateConfirmPassword(confirmPassword);
    }, [validateConfirmPassword, confirmPassword]);

    const canSubmit = useCallback(
        (): boolean =>
            !(
                currentPassword.length !== 0 &&
                currentPasswordErrorText === '' &&
                newPassword.length !== 0 &&
                !hasNewPasswordError &&
                confirmPassword.length !== 0 &&
                confirmPasswordErrorText === ''
            ),
        [
            currentPassword,
            currentPasswordErrorText,
            newPassword,
            hasNewPasswordError,
            confirmPassword,
            confirmPasswordErrorText,
        ]
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white[50] }}>
            <Header
                title={'Password Validation'}
                icon={<MatIcon name="menu" color={theme.colors.textPalette.onPrimary.main} size={24} />}
                onIconPress={(): void => {
                    toggleMenu();
                }}
            />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.section}>
                        <Body1>
                            Password must be at least 8 characters long, contain at least one uppercase character, one
                            lowercase character, one number, and one special character.
                        </Body1>
                        <Divider style={styles.topDivider} />
                        <View
                            style={
                                currentPasswordErrorText !== ''
                                    ? styles.currentPasswordErrorFormFieldWrapper
                                    : styles.currentPasswordFormFieldWrapper
                            }
                        >
                            <TextInput
                                label="Current Password *"
                                value={currentPassword}
                                onChangeText={onCurrentPasswordChange}
                                returnKeyType={'next'}
                                keyboardType={'default'}
                                error={currentPasswordErrorText !== ''}
                                errorText={currentPasswordErrorText}
                                onBlur={onCurrentPasswordBlur}
                                secureTextEntry={!isCurrentPasswordVisible}
                                rightIcon={{
                                    name: !isCurrentPasswordVisible ? 'eye-off' : 'eye',
                                    onPress: (): void => setIsCurrentPasswordVisible(!isCurrentPasswordVisible),
                                }}
                            />
                        </View>
                        <View style={styles.newPasswordFormFieldWrapper}>
                            <TextInput
                                label="New Password *"
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

                        <View
                            style={
                                confirmPasswordErrorText !== ''
                                    ? styles.confirmPasswordErrorFormFieldWrapper
                                    : styles.confirmPasswordFormFieldWrapper
                            }
                        >
                            <TextInput
                                label="Confirm Password *"
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
                <View style={styles.buttonContainer}>
                    <Divider style={styles.bottomDivider} />
                    <Button
                        mode="contained"
                        style={styles.submitButton}
                        onPress={(): void => {}}
                        disabled={canSubmit()}
                    >
                        Submit
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    );
};
