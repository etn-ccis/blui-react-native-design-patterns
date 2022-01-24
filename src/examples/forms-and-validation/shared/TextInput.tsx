import React, { MutableRefObject } from 'react';
import { View, StyleSheet, ViewStyle, TextInput as ReactTextInput, Platform, TextStyle } from 'react-native';
import { HelperText, TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import * as Colors from '@brightlayer-ui/colors';
import { Caption, Spacer } from '@brightlayer-ui/react-native-components';

const makeStyles = (
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    textInput: TextStyle;
    errorText: TextStyle;
    helperText: TextStyle;
    helperTextRight: TextStyle;
}> =>
    StyleSheet.create({
        textInput: {
            height: 70,
            fontSize: 18,
            backgroundColor: Colors.white['200'],
        },
        errorText: {
            color: theme.colors.error,
            fontSize: 12,
        },
        helperText: {
            color: Colors.gray[500],
            fontSize: 12,
        },
        helperTextRight: {
            paddingRight: 13,
            color: Colors.gray[500],
            fontSize: 12,
        },
    });

export type TextInputRenderProps = Omit<TextInputProps, 'theme'> & {
    errorText?: string;
    helperText?: string;
    helperStyles?: ViewStyle;
    helperTextRight?: string;
    rightIcon?: InputIconType;
    rightText?: InputTextType;
    rightIconOnPress?: () => void;
    theme?: ReactNativePaper.Theme;
    testID?: string;
};

export type InputIconType = {
    name?: string;
    color?: string;
    onPress?: () => void;
};

export type InputTextType = {
    text?: string;
    style?: TextStyle;
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
        error,
        errorText,
        helperText,
        helperTextRight,
        rightIcon,
        rightText,
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
                right={
                    rightIcon && rightIcon.name ? (
                        <PaperTextInput.Icon
                            name={rightIcon.name}
                            forceTextInputFocus={false}
                            onPress={rightIcon?.onPress}
                            color={rightIcon?.color}
                        />
                    ) : rightText && rightText.text ? (
                        <PaperTextInput.Affix text={rightText.text} textStyle={rightText.style} />
                    ) : undefined
                }
                error={error}
                {...inputProps}
            />
            {helperText && !error && (
                <View style={{ flexDirection: 'row' }}>
                    <HelperText type="info">
                        <Caption styles={{ root: styles.helperText }}>{helperText}</Caption>
                    </HelperText>
                    {helperTextRight && (
                        <>
                            <Spacer flex={1} />
                            <HelperText type="info">
                                <Caption styles={{ root: styles.helperTextRight }}>{helperTextRight}</Caption>
                            </HelperText>
                        </>
                    )}
                </View>
            )}

            {error && errorText && (
                <HelperText type="error">
                    <Caption style={styles.errorText}>{errorText}</Caption>
                </HelperText>
            )}
        </View>
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInput = React.forwardRef(TextInputRender);
TextInput.displayName = 'TextInput'; // Set a display name for testing with shallow renders
