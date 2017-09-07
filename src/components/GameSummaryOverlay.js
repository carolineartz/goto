import React from 'react';
import PropTypes from 'prop-types';

import AmCharts from '@amcharts/amcharts3-react';
import { makeMap } from './../data/ammapsData';

import { Box, Layer, List, ListItem, Value, LocationIcon, Meter, Label, Heading, Button, PlayIcon } from './grommet';

const GameSummaryOverlay = ({hidden, score, rounds, onClickPlayAgain}) =>
  <Layer
    hidden={hidden}
    id="game-summary-layer"
  >
    <Box pad="medium" full>
      <List>
        <ListItem>
          <Box>
            <Box><Heading tag="h1">You Scored a Total of {score} Points!</Heading></Box>
            <Box direction="row">
              <Box>
                <Value value={score}
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
              <Box>
                <Button
                  onClick={onClickPlayAgain}
                  style={{width: '188px'}}
                  className="grommetux-button__accent-3"
                  icon={<PlayIcon />}
                  label='Play Again'
                />
              </Box>
            </Box>
          </Box>
        </ListItem>
        { rounds.map((round, i) =>
          <ListItem key={`roundSummary-${i}`} justify='between'>
            <Value value={round.score}
              label={`Round ${round.number}`}
              units='points'
              size='medium' />
            <Value value={round.distance}
              icon={<LocationIcon />}
              label={round.placeName}
              units='mi'
              responsive
              size='medium'
              align='start'
            />
            <Box id={`round${i+1}-map`}>
              <AmCharts.React
                style={{width: '500px', height: '300px'}}
                options={makeMap({
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
};

export default GameSummaryOverlay;
