import React, { useCallback, useState } from 'react';
import { Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';
import { View, StyleSheet, ScrollView, ViewStyle, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from '../shared/TextInput';
import { Switch } from 'react-native-paper';
import * as Colors from '@pxblue/colors';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });
const DNSIcon = wrapIcon({ IconClass: MaterialIcons, name: 'dns' });
const InsightsIcon = wrapIcon({ IconClass: MaterialIcons, name: 'insights' });

const makeStyles = (): StyleSheet.NamedStyles<{
    infoListItem: ViewStyle;
    textInput: ViewStyle;
}> =>
    StyleSheet.create({
        infoListItem: {
            backgroundColor: Colors.white[50],
        },
        textInput: {
            height: 40,
            width: 136,
        },
    });

export const FormInAListScreen: React.FC = () => {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
    const styles = makeStyles();
    const [ipAddress, setIPAddress] = useState('10.0.0.1');
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    const onIPAddressChange = useCallback((text: string) => {
        setIPAddress(text);
    }, []);

    const onSwitchToggle = (): void => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={{ flex: 1 }}>
            <Header
                title={'In A List'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
            />
            <SafeAreaView>
                <ScrollView>
                    <InfoListItem
                        style={styles.infoListItem}
                        title={'IP Address'}
                        IconClass={DNSIcon}
                        divider={'partial'}
                        rightComponent={
                            <TextInput value={ipAddress} onChangeText={onIPAddressChange} style={styles.textInput} />
                        }
                    />
                    <InfoListItem
                        style={styles.infoListItem}
                        title={'Insight Report'}
                        subtitle={'Auto-report every 2 months'}
                        IconClass={InsightsIcon}
                        rightComponent={<Switch value={isSwitchOn} onValueChange={onSwitchToggle} />}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
