import React from 'react';
import renderer from 'react-test-renderer';
import { PasswordValidationScreen } from './PasswordValidation';
import { LOWER_CASE_REGEX, NUMBERS_REGEX, SPECIAL_CHAR_REGEX, UPPER_CASE_REGEX } from './PasswordRequirements';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Password Validation Tests', () => {
    it('renders the screen', () => {
        const tree = renderer
            .create(
                <ThemeProvider theme={BLUIThemes.blue}>
                    <SafeAreaProvider>
                        <PasswordValidationScreen />
                    </SafeAreaProvider>
                </ThemeProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('recognizes valid password correctly', () => {
        // At least 1 uppercase letter
        let correctPasswords = ['A', 'Ab', 'AaaAAAAaaNjL', '&A!'];
        let incorrectPasswords = ['', 'a', '1', '.', 'null', 'undefined'];
        correctPasswords.forEach((val): void => {
            expect(UPPER_CASE_REGEX.test(val)).toBeTruthy();
        });
        incorrectPasswords.forEach((val): void => {
            expect(UPPER_CASE_REGEX.test(val)).toBeFalsy();
        });

        // At least 1 lowercase letter
        correctPasswords = ['a', 'Ab', 'AaaAAAAaaNjL', '^a@$', 'NaN', 'null', 'undefined'];
        incorrectPasswords = ['', 'A', '1', '.'];
        correctPasswords.forEach((val): void => {
            expect(LOWER_CASE_REGEX.test(val)).toBeTruthy();
        });
        incorrectPasswords.forEach((val): void => {
            expect(LOWER_CASE_REGEX.test(val)).toBeFalsy();
        });

        // At least 1 special character: (valid: ! @ # $ ^ &)
        correctPasswords = ['!', '@', '#', '$', '^', '&', '1!', ' as&', '!!^'];
        incorrectPasswords = ['', 'A', '1', '.', '"', ',', 'a'];
        correctPasswords.forEach((val): void => {
            expect(SPECIAL_CHAR_REGEX.test(val)).toBeTruthy();
        });
        incorrectPasswords.forEach((val): void => {
            expect(SPECIAL_CHAR_REGEX.test(val)).toBeFalsy();
        });

        // At least 1 digit
        correctPasswords = ['1', '2', '1234', 'aa1bds;:!', '$!0', '0'];
        incorrectPasswords = ['', 'b', '!', '.', 'NaN', 'undefined', 'TheSuperWomanBulecat!'];
        correctPasswords.forEach((val): void => {
            expect(NUMBERS_REGEX.test(val)).toBeTruthy();
        });
        incorrectPasswords.forEach((val): void => {
            expect(NUMBERS_REGEX.test(val)).toBeFalsy();
        });
    });
});
