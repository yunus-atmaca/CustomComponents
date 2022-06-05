import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Close({color, ...props}: SvgProps) {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M19.5 6.41L18.09 5L12.5 10.59L6.91 5L5.5 6.41L11.09 12L5.5 17.59L6.91 19L12.5 
      13.41L18.09 19L19.5 17.59L13.91 12L19.5 6.41Z"
        fill={color || 'black'}
      />
    </Svg>
  );
}
