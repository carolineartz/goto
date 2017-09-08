import React from 'react';
import { Tile } from './grommet';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-bg-image';

const Image = ({src, thumb, onClick}) =>
  <Tile
    pad="small"
    className='img'
    onClick={onClick}>
    <ProgressiveImage
      src={src}
      placeholder={thumb}
      style={{
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
      }}
      component='img'
    />
  </Tile>;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default Image;

