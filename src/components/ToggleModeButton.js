import React from 'react';
import PropTypes from 'prop-types';

import { COLOR_MODE_MAP } from './utils/constants';

import { Button, SVGIcon } from './grommet';

const ToggleModeButton = ({ mode, onClickToggleMode }) =>
  <Button
    onClick={onClickToggleMode}
    plain
    id="mode-button"
    icon={
      <SVGIcon viewBox="0 0 129 129"
        version='1.1'
        type='control'
        a11yTitle='Brightness Switcher'>
        <g fill={COLOR_MODE_MAP[mode]}>
          <path d="m64.5,92.6c15.5,0 28-12.6 28-28s-12.6-28-28-28-28,12.6-28,28 12.5,28 28,28zm0-47.9c11,0 19.9,8.9 19.9,19.9 0,11-8.9,19.9-19.9,19.9s-19.9-8.9-19.9-19.9c0-11 8.9-19.9 19.9-19.9z"/><path d="m68.6,23.6v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1z"/><path d="m60.4,105.6v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1z"/><path d="m96.4,38.5l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"/><path d="m23.5,105.6c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8z"/><path d="m122.5,64.6c0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.8,4.1 4.1,4.1h12.9c2.2,1.42109e-14 4.1-1.8 4.1-4.1z"/><path d="m10.6,68.7h12.9c2.3,0 4.1-1.8 4.1-4.1 0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.9,4.1 4.1,4.1z"/><path d="m102.6,106.8c1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.9,1.2 2.9,1.2z"/><path d="m38.4,38.5c1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z" />
        </g>
      </SVGIcon>
    }
  />;

ToggleModeButton.propTypes = {
  mode: PropTypes.string.isRequired,
  onClickToggleMode: PropTypes.func.isRequired
};

export default ToggleModeButton;
