import React from 'react';
import PropTypes from 'prop-types';
import { Button, Layer, Box, Headline } from './grommet';

const GameOverviewOverlay = ({hidden, onClickPlay, mode}) => (
  <Layer
    hidden={hidden}
    id="game-overview-layer"
    className={mode === 'dark' ? 'dark-mode' : 'light-mode'}
  >
    <Box pad="medium" full>
      <Headline strong={true}
        size='medium'>
        TODO: Put Instructions Here!
      </Headline>
      <Box>
        <Button
          onClick={onClickPlay}
          style={{width: '188px'}}
          className="grommetux-button__accent-3"
          label='Play'
        />
      </Box>
    </Box>
  </Layer>
);

GameOverviewOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
};

export default GameOverviewOverlay;
