import React from 'react';
import { Header } from '@pxblue/react-native-components';
import bg from '../../assets/images/farm.jpg';

export const CollapsibleAppbarScreen: React.FC = () => (
    <Header
        expandable
        startExpanded
        backgroundImage={bg}
        title={'Collapsible Appbar'}
        subtitle={'Tap to collapse/expand'}
        info={`I'm hidden when collapsed`}
    />
);
