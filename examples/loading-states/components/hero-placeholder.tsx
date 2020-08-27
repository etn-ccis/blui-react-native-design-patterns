import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

export const HeroPlaceholder: React.FC = () => (
    <React.Fragment>
        <View
            style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginVertical: 24,
            }}
        >
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderMedia
                        style={{
                            marginBottom: 16,
                            alignSelf: 'center',
                            borderRadius: 24,
                        }}
                    />
                    <PlaceholderLine height={24} />
                </Placeholder>
            </View>
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderMedia
                        style={{
                            marginBottom: 16,
                            alignSelf: 'center',
                            borderRadius: 24,
                        }}
                    />
                    <PlaceholderLine height={24} />
                </Placeholder>
            </View>
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderMedia
                        style={{
                            marginBottom: 16,
                            alignSelf: 'center',
                            borderRadius: 24,
                        }}
                    />
                    <PlaceholderLine height={24} />
                </Placeholder>
            </View>
        </View>
        <View style={{ margin: 16 }}>
            <Placeholder Animation={Fade}>
                <PlaceholderLine height={16} />
            </Placeholder>
        </View>
        <View style={{ margin: 16 }}>
            <Placeholder Animation={Fade}>
                <PlaceholderLine height={16} />
            </Placeholder>
        </View>
        <View style={{ margin: 16 }}>
            <Placeholder Animation={Fade}>
                <PlaceholderLine height={16} />
            </Placeholder>
        </View>
    </React.Fragment>
);
