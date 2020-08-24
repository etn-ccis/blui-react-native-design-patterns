import React from 'react';
import { View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

export const HeroPlaceholder: React.FC = () => (
  <React.Fragment>
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10
      }}>
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={{
              marginBottom: 15,
              alignSelf: 'center',
              borderRadius: 20,
            }}
          />
          <PlaceholderLine height={20} />
        </Placeholder>
      </View>
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={{
              marginBottom: 15,
              alignSelf: 'center',
              borderRadius: 20,
            }}
          />
          <PlaceholderLine height={20} />
        </Placeholder>
      </View>
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={{
              marginBottom: 15,
              alignSelf: 'center',
              borderRadius: 20,
            }}
          />
          <PlaceholderLine height={20} />
        </Placeholder>
      </View>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 0 }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={20} />
      </Placeholder>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={20} />
      </Placeholder>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={20} />
      </Placeholder>
    </View>
  </React.Fragment>
)