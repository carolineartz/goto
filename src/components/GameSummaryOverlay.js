import React from 'react';
import PropTypes from 'prop-types';

import AmCharts from '@amcharts/amcharts3-react';
import { makeMap } from './../data/ammapsData';

import { Box, Layer, List, ListItem, Value, LocationIcon, Meter, Label, Button } from './grommet';

const GameSummaryOverlay = ({hidden, score, rounds, onClickPlayAgain, mode}) =>
  <Layer
    hidden={hidden}
    id="game-summary-layer"
    className={mode === 'dark' ? 'dark-mode' : 'light-mode'}
  >
    <Box pad="small" full>
      <List>
        <ListItem pad="small" alignSelf="center" alignContent="center" justify="center" align="center">
          <Box pad={{horizontal: 'large', vertical: 'small'}}>
            <Value value={score}
              className='summary-total-score'
              units='points'
              size='medium'
              align='start' />
            <Meter size='medium' value={(score/500) * 100} />
            <Box direction='row'
              justify='between'
              pad={{between: 'small'}}
              responsive={false}>
              <Label size='small'>
                0
              </Label>
              <Label size='small'>
                500
              </Label>
            </Box>
          </Box>
          <Box pad={{horizontal: 'medium', vertical: 'small'}}>
            <Button
              onClick={onClickPlayAgain}
              style={{width: '188px'}}
              className="grommetux-button__accent-3"
              label='Exit'
            />
          </Box>
        </ListItem>
        { rounds.map((round, i) =>
          <ListItem key={`roundSummary-${i}`} justify='between'>
            <Value value={round.score}
              label={`Round ${round.number}`}
              className="summary-score"
              units='points'
              size='medium' />
            <Value value={round.distance}
              className='summary-location'
              icon={<LocationIcon size='small' />}
              label={round.placeName}
              units='mi'
              size='medium'
            />
            <Box pad="small" id={`round${i+1}-map`}>
              <AmCharts.React
                style={{width: '500px', height: '300px'}}
                options={makeMap({
                  mode,
                  elementId: `round${round.number}-map`,
                  placeCoordinates: round.placeCoordinates,
                  guessCoordinates: round.guessCoordinates,
                  placeName: round.placeName
                })}
              />
            </Box>
          </ListItem>)
        }
      </List>
    </Box>
  </Layer>;

GameSummaryOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onClickPlayAgain: PropTypes.func.isRequired,
  rounds: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
};

export default GameSummaryOverlay;
