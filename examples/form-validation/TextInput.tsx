import React, { MutableRefObject } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextInput as ReactTextInput, Platform } from 'react-native';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import { Subtitle2 } from '@pxblue/react-native-components';
import * as Colors from '@pxblue/colors';

const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        textInput: {
            height: 70,
            fontSize: 18,
            backgroundColor: Colors.white['200'],
        },
        errorText: {
            position: 'absolute',
            bottom: -20,
            paddingLeft: 13,
            color: theme.colors.error,
        },
        helperText: {
            position: 'absolute',
            bottom: -20,
            paddingLeft: 13,
        },
        helperTextRight: {
            position: 'absolute',
            bottom: -20,
            right: 0,
            paddingRight: 13,
        },
        rightIcon: {
            position: 'absolute',
            right: 0,
            bottom: 10,
            height: 50,
            width: 50,
            padding: 5,
            flex: 1,
            justifyContent: 'center',
        },
    });

export type TextInputRenderProps = Omit<TextInputProps, 'theme'> & {
    errorText?: string;
    helperText?: string;
    helperStyles?: ViewStyle;
    helperTextRight?: string;
    rightIcon?: JSX.Element;
    theme?: ReactNativePaper.Theme;
    testID?: string;
};

type ErrorTextProps = {
    errorText: string | undefined | null;
    style?: StyleProp<ViewStyle>;
    theme?: ReactNativePaper.Theme;
};

const ErrorText: React.FC<ErrorTextProps> = (props) => {
    const { errorText, style } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme);

    return (
        <Subtitle2 style={[styles.errorText, style]} font={'regular'}>
            {errorText || null}
        </Subtitle2>
    );
};

type HelperTextProps = {
    helperText: string | undefined | null;
    helperTextRight?: string | undefined | null;
    style?: StyleProp<ViewStyle>;
    theme?: ReactNativePaper.Theme;
};

const HelperText: React.FC<HelperTextProps> = (props) => {
    const { helperText, helperTextRight, style } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme);

    return (
        <View style={{ flexDirection: helperTextRight ? 'row' : 'column' }}>
            <Subtitle2 style={[styles.helperText, style]} font={'regular'}>
                {helperText || null}
            </Subtitle2>
            {helperTextRight && (
                <Subtitle2 style={[styles.helperTextRight, style]} font={'regular'}>
                    {helperTextRight}
                </Subtitle2>
            )}
        </View>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const TextInputRender: React.ForwardRefRenderFunction<{}, TextInputRenderProps> = (
    props: TextInputRenderProps,
    ref: MutableRefObject<{} | null> | ((instance: {} | null) => void) | null // eslint-disable-line @typescript-eslint/ban-types
) => {
    const {
        style,
        keyboardType = 'default',
        autoCapitalize = 'none',
        returnKeyType = 'done',
        errorText,
        helperText,
        helperStyles,
        helperTextRight,
        rightIcon,
        theme: customTheme,
        ...inputProps
    } = props;
    const theme = useTheme(customTheme);
    const styles = makeStyles(theme);

    const inputRef = React.useRef<ReactTextInput>(null);
    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            if (inputRef && inputRef.current) inputRef.current.focus();
        },
    }));

    const selectionColor = Platform.OS === 'android' ? Colors.blue['100'] : undefined;
    return (
        <View>
            <PaperTextInput
                ref={inputRef}
                style={[styles.textInput, style]}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                returnKeyType={returnKeyType}
                textContentType={props.secureTextEntry ? 'oneTimeCode' : 'none'} // "oneTimeCode" is workaround to avoid iOS 12 "strong password" autofill overlay on secure input password fields (ISSUE TRACKING: https://github.com/facebook/react-native/issues/21911)
                underlineColor={Colors.gray['100']}
                selectionColor={selectionColor}
                {...inputProps}
            />
            {props.error ? <ErrorText errorText={errorText} /> : null}
            {props.helperText && !props.error ? (
                <HelperText helperText={helperText} helperTextRight={helperTextRight} style={helperStyles} />
            ) : null}
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInput = React.forwardRef(TextInputRender);
TextInput.displayName = 'TextInput'; // Set a display name for testing with shallow renders
