import React from 'react';
import { Header, wrapIcon, H2, Body1 } from '@pxblue/react-native-components';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Linking, StyleSheet } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Button, Divider } from 'react-native-paper';

const MenuIcon = wrapIcon({ IconClass: MaterialIcons, name: 'menu' });

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
        paddingLeft: 16,
        paddingRight: 16,
    },
    paragraph: {
        marginTop: 24,
    },
    patternsMenuButton: {
        marginTop: 24,
        marginBottom: 24,
        borderColor: Colors.blue[500],
    },
    divider: {
        marginBottom: 24,
    },
    link: {
        marginBottom: 8,
    },
});

export const Home: React.FC = () => {
    const navigation = useNavigation();

    const toggleMenu = (): void => {
        navigation.openDrawer();
    };

    return (
        <View>
            <Header
                title={'Design Pattern Examples'}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        toggleMenu();
                    },
                }}
            />
            <View style={styles.container}>
                <H2>
                    The <Text style={{ color: Colors.blue[500] }}>Patterns</Text>.
                </H2>

                <Body1 style={styles.paragraph}>
                    A <Text style={{ fontWeight: 'bold' }}>design pattern</Text> is a common interaction or behavior
                    that should be consistent across applications. In general, we follow most of the design patterns and
                    behavior from the Material Design system. PX Blue design patterns are patterns that extend/modify
                    those from Material or are specific to PX Blue applications.
                </Body1>

                <Body1 style={styles.paragraph}>
                    While everyone is encouraged to interact with the design pattern demos to become familiar with the
                    interactions and behaviors, this application is primarily intended for
                    <Text style={{ fontWeight: 'bold' }}> React Native developers </Text> to provide examples of how to
                    implement these patterns in their own applications.
                </Body1>

                <Button
                    style={styles.patternsMenuButton}
                    accessibilityStates
                    mode={'outlined'}
                    color={Colors.blue[500]}
                    onPress={(): void => {
                        toggleMenu();
                    }}
                >
                    Explore PX Blue Design Patterns
                </Button>

                <Divider accessibilityStates style={styles.divider} />

                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://pxblue.github.io/development/frameworks-mobile/react-native');
                    }}
                >
                    React Native Getting Started Guide
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://pxblue.github.io/patterns');
                    }}
                >
                    Design Pattern Descriptions
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://pxblue-components.github.io/react-native/');
                    }}
                >
                    PX Blue React Native Component Library
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://github.com/pxblue');
                    }}
                >
                    Visit Us on GitHub
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://github.com/pxblue/react-design-patterns');
                    }}
                >
                    Design Pattern Source on GitHub
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://pxblue.github.io/roadmap');
                    }}
                >
                    Release Roadmap
                </Button>
                <Button
                    style={styles.link}
                    accessibilityStates
                    onPress={(): void => {
                        void Linking.openURL('https://pxblue.github.io/community/contactus');
                    }}
                >
                    Send Feedback or Suggestions
                </Button>
            </View>
        </View>
    );
};
