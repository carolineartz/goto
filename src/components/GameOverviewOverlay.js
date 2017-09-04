import React from 'react';
import PropTypes from 'prop-types';
import { Button, Layer, Box, Headline } from './grommet';

const GameOverviewOverlay = ({isVisible, onClickPlay}) => (
  <Layer
    hidden={!isVisible}
    id="game-preview-layer"
  >
    <Box pad="medium" full>
      <Headline strong={true}
        size='medium'>
        TODO: Put Instructions Here!
      </Headline>
      <Button box margin="medium" alignSelf="center" justify="center" onClick={onClickPlay}>
        Play
      </Button>
    </Box>
  </Layer>
);

GameOverviewOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired
};

export default GameOverviewOverlay;
