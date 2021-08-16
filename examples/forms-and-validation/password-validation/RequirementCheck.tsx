import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';
import { Subtitle2 } from '@pxblue/react-native-components';

const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        text: {
            paddingLeft: 10,
        },
    });

type RequirementCheckProps = {
    isChecked: boolean;
    text: string;
    theme?: ReactNativePaper.Theme;
};

export const RequirementCheck: React.FC<RequirementCheckProps> = (props) => {
    const { isChecked, text } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles();

    function iconColorIfValid(valid: boolean): string {
        return valid ? theme.colors.primary : Colors.gray['200'];
    }

    function textColorIfValid(valid: boolean): string {
        return valid ? Colors.gray['300'] : theme.colors.text;
    }

    return (
        <View style={styles.itemContainer}>
            <MatIcon name={'check'} size={24} color={iconColorIfValid(isChecked)} />
            <Subtitle2 font={'regular'} style={[styles.text, { color: textColorIfValid(isChecked) }]}>
                {text}
            </Subtitle2>
        </View>
    );
};
