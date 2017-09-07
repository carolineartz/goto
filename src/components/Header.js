import React from 'react';
import classNames  from 'classnames';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import {
  Button,
  Box,
  Value,
  Meter,
  Header as GHeader,
  PlayIcon,
  Label,
  CompassIcon,
  MapLocationIcon
} from './grommet';

import RoundStatus from './RoundStatus';

const Header = ({
  hasStarted,
  onClickPlay,
  onClickOverview,
  onClickToggleShowMap,
  onClickSubmitGuess,
  onClickNextRound,
  onClickShowSummary,
  roundPossiblePoints,
  totalScore,
  style,
  hasPin,
  currentRound,
  roundIsComplete,
  gameIsComplete,
  mapIsShown,
  gameReady
}) => (
  <GHeader style={{...style}} size="small" justify="center">
    {
      !hasStarted &&
        <Box size={{height: 'small', width: {max: 'large'}}} alignSelf="center" alignContent="center" direction="row" justify="center" align="center">
          <Box pad="small" margin="small">
            <Button
              id="header-play-button"
              disabled={!gameReady}
              style={{width: '120px', textAlign: 'center', height: '40px'}}
              className={classNames({'grommetux-button__accent-3': true, disabled: !gameReady})}
              label={gameReady ? 'Play' : ''}
              icon={!gameReady ? <Spinner name="double-bounce" color="coral"/> : undefined}
              onClick={() => gameReady ? onClickPlay() : null}
            />
          </Box>
          <Box pad="small" margin="small">
            <Button
              accent
              label="What is This?"
              onClick={onClickOverview}
            />
          </Box>
        </Box>
    }
    {
      hasStarted &&
        <Box basis="full" flex="grow" direction="row" justify="between" align="center">
          <Box style={{paddingRight: '0'}} pad={{horizontal: 'medium', vertical: 'small'}} size="small">
            <RoundStatus round={currentRound} hidden={!roundIsComplete} />
            <Value value={roundPossiblePoints}
              align='start'
              size="small"
              units='possible points this round'
            />
            <Meter vertical={false} data-value={roundPossiblePoints} value={roundPossiblePoints} />
            <Box direction='row'
              justify='between'
              pad={{'between': 'small'}}
              responsive={false}>
              <Label size='small'>0</Label>
              <Label size='small'>100</Label>
            </Box>
          </Box>
          <Box justify="start" pad={{horizontal: 'medium', vertical: 'none'}}>
            <Value value={totalScore}
              label='Total Points'
              units='/ 500' />
          </Box>
          <Box pad={{horizontal: 'small', vertical: 'none'}}>
            {
              roundIsComplete ?
                <Button
                  style={{width: '188px'}}
                  className="grommetux-button__accent-3"
                  icon={gameIsComplete ? undefined : <PlayIcon />}
                  label={gameIsComplete ? 'Show Summary' : 'Next Round'}
                  onClick={gameIsComplete ? onClickShowSummary : onClickNextRound}
                /> :
                <Button
                  style={{width: '188px'}}
                  className={classNames({disabled: !hasPin})}
                  disabled={!roundIsComplete}
                  accent
                  icon={<CompassIcon />}
                  label="Submit Guess"
                  onClick={onClickSubmitGuess}
                />
            }
          </Box>
          <Box pad={{horizontal: 'medium', vertical: 'none'}}>
            <Button
              style={{width: '162px'}}
              className="grommetux-button__accent-2"
              icon={<MapLocationIcon />}
              label={mapIsShown ? 'Hide Map' : 'Show Map'}
              onClick={onClickToggleShowMap}
            />
          </Box>
        </Box>
    }
  </GHeader>
);

Header.propTypes = {
  hasStarted: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onClickOverview: PropTypes.func.isRequired,
  onClickToggleShowMap: PropTypes.func.isRequired,
  onClickSubmitGuess: PropTypes.func.isRequired,
  onClickNextRound: PropTypes.func.isRequired,
  onClickShowSummary: PropTypes.func.isRequired,
  roundPossiblePoints: PropTypes.number,
  totalScore: PropTypes.number,
  style: PropTypes.any,
  currentRound: PropTypes.any,
  hasPin: PropTypes.bool.isRequired,
  roundIsComplete: PropTypes.bool.isRequired,
  gameIsComplete: PropTypes.bool.isRequired,
  mapIsShown: PropTypes.bool.isRequired,
  gameReady: PropTypes.bool.isRequired
};

export default Header;
