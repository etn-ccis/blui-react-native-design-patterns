import React from 'react';
import { Header } from '@brightlayer-ui/react-native-components';

type PlaceholderProps = {
    title?: string;
};
export const Placeholder: React.FC<PlaceholderProps> = (props) => {
    const { title = 'Coming Soon' } = props;
    return <Header title={title} />;
};
