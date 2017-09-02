import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Animate,
  Value,
  LocationIcon,
  FormAddIcon
} from './grommet';

class RoundStatus extends Component {
  render() {
    const displayRoundInfo = !!this.props.roundScore;

    return (
      <Box className="round-info-box-wrapper">
        <Animate
          enter={{'animation': 'fade', 'duration': 1, 'delay': 0}}
          visible={displayRoundInfo}
        >
          <Box direction='row' align="center" className='round-info-box'>
            <Box pad="small" justify="center" className='round-location'>
              <Value value={this.props.distanceInMiles}
                icon={<LocationIcon />}
                label={this.props.placeName}
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
                <Value value={this.props.roundScore}
                  icon={<FormAddIcon />}
                  units='pts'
                  label={`round ${this.props.roundNumber} / 5`}
                />
              </Box>
            </Animate>
          </Box>
        </Animate>
      </Box>
    );
  }
}
const select = (state) => {
  const round = state.rounds.current;
  return {
    roundScore: round.score,
    roundNumber: round.number,
    placeName: round.place.name,
    distanceInMiles: round.distance
  };
};
export default connect(select)(RoundStatus);
