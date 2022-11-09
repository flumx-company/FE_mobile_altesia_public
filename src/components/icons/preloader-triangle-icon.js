import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PreloaderTriangleIcon = ({ color }) => (
  <Svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M9.28501 1.85831C10.0618 0.563634 11.9382 0.563632 12.715 1.85831L21.1826 15.971C21.9824 17.3041 21.0222 19 19.4676 19H2.53238C0.977792 19 0.0175655 17.3041 0.817395 15.971L9.28501 1.85831Z" fill={color} />
  </Svg>
);

export default PreloaderTriangleIcon;
