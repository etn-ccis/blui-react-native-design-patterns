import React from 'react';
import renderer from 'react-test-renderer';
import { EMAIL_REGEX, FormValidationScreen, PHONE_NUMBER_REGEX } from './FormValidation';
import { LOWER_CASE_REGEX, NUMBERS_REGEX, SPECIAL_CHAR_REGEX, UPPER_CASE_REGEX } from './PasswordRequirements';

jest.mock('@react-navigation/native', () => ({
    useNavigation: (): any => ({ openDrawer: jest.fn(() => true) }),
}));

describe('Form Validation Tests', () => {
    it('renders the screen', () => {
        const tree = renderer.create(<FormValidationScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('recognizes emails correctly', () => {
        const correctEmails = ['a@a.co', 'A_a.vb@eaton.com.us', 'a+@123.com'];
        const incorrectEmails = ['', '@', 'a@c', 'a@a.c', 'a@', '@bc.com', '"help@etn.com"'];
        correctEmails.forEach((val): void => {
            expect(EMAIL_REGEX.test(val)).toBeTruthy();
        });
        incorrectEmails.forEach((val): void => {
            expect(EMAIL_REGEX.test(val)).toBeFalsy();
        });
    });

    it('recognizes phone numbers correctly', () => {
        const correctPhoneNumbers = ['1111111111', '123-123-1234', '(123) 123 1234', '123 123 1234', '123.123.1234'];
        const incorrectPhoneNumbers = [
            '',
            '1',
            '+',
            ' ',
            '          ',
            '   -   -    ',
            '123(123)1234',
            '111 111 11111',
        ];
        correctPhoneNumbers.forEach((val): void => {
            expect(PHONE_NUMBER_REGEX.test(val)).toBeTruthy();
        });
        incorrectPhoneNumbers.forEach((val): void => {
            expect(PHONE_NUMBER_REGEX.test(val)).toBeFalsy();
        });
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
