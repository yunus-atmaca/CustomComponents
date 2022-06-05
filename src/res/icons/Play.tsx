import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Play({color, ...props}: SvgProps) {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" {...props}>
      <Path d="M16 38L38 24L16 10L16 38Z" fill={color || 'white'} />
    </Svg>
  );
}
