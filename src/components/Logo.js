import React from 'react';
import { SVGIcon, Box } from './grommet';

const Logo = () => (
  <SVGIcon viewBox="0 0 150 153"
    version='1.1'
    type='logo'
    a11yTitle='GOTO Logo'
    id="logo">
    <g className="goto-logo">
      <g className="logo-letters">
        <path d="M78,116.72 C78,97.055 93.865,81 113.53,81 C133.195,81 149.155,97.055 149.155,116.72 C149.155,136.385 133.195,152.25 113.53,152.25 C93.865,152.25 78,136.385 78,116.72 Z M130.605,116.72 C130.605,107.315 123.005,99.715 113.6,99.715 C104.29,99.715 96.69,107.315 96.69,116.72 C96.69,126.03 104.29,133.725 113.6,133.725 C123.005,133.725 130.605,126.03 130.605,116.72 Z" />
        <polygon points="3 99.62 26.6441406 99.62 26.6441406 152.345 45.3591406 152.345 45.3591406 99.62 67.7304687 99.62 67.7304688 81 3 81" />
        <path d="M35.53,32.965 L35.53,45.505 L49.305,45.505 C46.36,49.78 41.135,52.535 35.53,52.535 C26.79,52.535 18.715,45.41 18.715,35.625 C18.715,25.84 26.6,18.715 35.53,18.715 C40.375,18.715 44.365,20.615 47.405,23.465 L60.61,10.355 C54.15,3.99 45.315,0 35.53,0 C15.865,0 0,15.96 0,35.625 C0,55.29 15.865,71.25 35.53,71.25 C55.195,71.25 71.155,55.29 71.155,35.625 L71.155,32.965 L35.53,32.965 Z" />
      </g>
      <path className="logo-pin" d="M78,35.72 C78,16.055 93.865,0 113.53,0 C133.195,0 149.155,16.055 149.155,35.72 C149.155,48.83 137.295833,76.2286719 113.5775,117.916016 C89.8591667,76.2286719 78,48.83 78,35.72 Z M130.535,35.625 C130.535,26.22 122.935,18.62 113.53,18.62 C104.22,18.62 96.62,26.22 96.62,35.625 C96.62,44.935 104.22,52.63 113.53,52.63 C122.935,52.63 130.535,44.935 130.535,35.625 Z" />
    </g>
  </SVGIcon>
);

const MainLogo = () =>
  <Box className="logo-main-container" justify="center" align="center" size="medium">
    <Logo />
  </Box>;

export { MainLogo };

export default Logo;
