import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Notification,
  Animate,
  Value,
  LocationIcon,
  FormAddIcon
} from './grommet';
// <Notification message='Sample message'
//   size='medium'
//   className="round-info-box"
//   style={{minHeight: "100px"}}
// />
class RoundStatus extends Component {
  render() {
    return (
      <Box className="round-info-box-wrapper">
        <Animate
          enter={{'animation': 'slide-right', 'duration': 1000, 'delay': 1000}}
          visible={this.props.displayRoundInfo}
        >
          <Box direction='row' align="center" className='round-info-box'>
            <Box pad="small" className='round-location'>
              <Value value={this.props.distanceInMiles}
                icon={<LocationIcon />}
                label={this.props.targetPlaceName}
                units='mi'
                responsive
                size='medium'
                align='start'
              />
            </Box>
            <Box pad="small" className='round-score'>
              <Animate
                enter={{'animation': 'fade', 'duration': 1000, 'delay': 2000}}
                visible
                keep
              >
                <Value value={this.props.roundScore}
                  icon={<FormAddIcon />}
                  units='pts'
                  label={`round ${this.props.roundNumber} / 5`}
                />
              </Animate>
            </Box>
          </Box>
        </Animate>
      </Box>
    );
  }
}
const select = (state) => ({
  roundScore: state.rounds.roundScore,
  hasRoundScore: state.rounds.hasRoundScore,
  // displayRoundInfo: true
  roundNumber: state.rounds.nextRoundIndex,
  displayRoundInfo: state.rounds.hasRoundScore,
  targetPlaceName: state.rounds.currentRound.place.place.name,
  distanceInMiles: state.rounds.distance
});
export default connect(select)(RoundStatus);
