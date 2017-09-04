import React from 'react';
import { Tile, Image as GImage } from './grommet';
import PropTypes from 'prop-types';

const Image = ({src, onClick}) =>
  <Tile
    pad="small"
    className='img'
    onClick={onClick}>
    <GImage alt="" src={src} />
  </Tile>;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Image;

