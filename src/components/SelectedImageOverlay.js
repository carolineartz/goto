import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Box, Image } from './grommet';

const SelectedImageOverlay = ({onClose, src}) =>
  <Layer
    className="image-expand-layer"
    hidden={!src}
    closer
    onClose={onClose}
  >
    <Box size="large" basis="full">
      <Image alt="" fit="cover" src={src} />
    </Box>
  </Layer>;

SelectedImageOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};

export default SelectedImageOverlay;

