import React, {FC} from 'react';
import {View, ViewProps} from 'react-native';

import {Constants} from '@src/utils';

type Props = {
  hasHeader?: boolean;
  hasTabBar?: boolean;
};

const PageContainer: FC<Props & ViewProps> = props => {
  return (
    <View
      {...props}
      style={[
        props.style,
        {
          paddingTop: props.hasHeader ? Constants.HEADER_HEIGHT : 0,
          paddingBottom: props.hasTabBar ? Constants.TAB_BAR_HEIGHT : 0,
        },
      ]}
    />
  );
};

export default PageContainer;
