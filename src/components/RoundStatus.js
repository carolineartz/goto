import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Animate,
  Value,
  LocationIcon,
  FormAddIcon
} from './grommet';

const RoundStatus = ({round, hidden}) =>
  <Animate
    enter={{'animation': 'fade', 'duration': 1, 'delay': 0}}
    visible={!hidden}
  >
    <Box className="round-info-box-wrapper">
      <Box direction='row' align="center" className='round-info-box'>
        <Box pad="small" justify="center" className='round-location'>
          <Value value={round.distance}
            icon={<LocationIcon />}
            label={round.placeName}
            units='mi'
            responsive
            size='medium'
            align='start'
          />
        </Box>
        <Animate
          enter={{'animation': 'slide-right', 'duration': 1000, 'delay': 2000}}
          visible
          keep
        >
          <Box pad="small" justify="center" className='round-score'>
            <Value value={round.score}
              icon={<FormAddIcon />}
              units='pts'
              label={`round ${round.number} / 5`}
            />
          </Box>
        </Animate>
      </Box>
    </Box>
  </Animate>;

RoundStatus.propTypes = {
  hidden: PropTypes.bool.isRequired,
  round: PropTypes.any,
};

export default RoundStatus;
