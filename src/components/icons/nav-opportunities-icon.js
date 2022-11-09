import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NavOpportunitiesIcon = ({ color = '#2C332D' }) => (
  <Svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M4.33335 7.33333C3.41288 7.33333 2.66669 8.07952 2.66669 9V22.3333C2.66669 23.2538 3.41288 24 4.33335 24H25.6667C26.5872 24 27.3334 23.2538 27.3334 22.3333V9C27.3334 8.07952 26.5872 7.33333 25.6667 7.33333H4.33335ZM0.666687 9C0.666687 6.97496 2.30831 5.33333 4.33335 5.33333H25.6667C27.6917 5.33333 29.3334 6.97496 29.3334 9V22.3333C29.3334 24.3584 27.6917 26 25.6667 26H4.33335C2.30831 26 0.666687 24.3584 0.666687 22.3333V9Z" fill={color} />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.74063 1.07394C10.4283 0.386308 11.3609 0 12.3334 0H17.6667C18.6391 0 19.5718 0.386308 20.2594 1.07394C20.947 1.76157 21.3334 2.69421 21.3334 3.66667V25C21.3334 25.5523 20.8856 26 20.3334 26C19.7811 26 19.3334 25.5523 19.3334 25V3.66667C19.3334 3.22464 19.1578 2.80072 18.8452 2.48816C18.5326 2.17559 18.1087 2 17.6667 2H12.3334C11.8913 2 11.4674 2.17559 11.1548 2.48816C10.8423 2.80072 10.6667 3.22464 10.6667 3.66667V25C10.6667 25.5523 10.219 26 9.66669 26C9.1144 26 8.66669 25.5523 8.66669 25V3.66667C8.66669 2.69421 9.053 1.76157 9.74063 1.07394Z" fill={color} />
  </Svg>
);

export default NavOpportunitiesIcon;