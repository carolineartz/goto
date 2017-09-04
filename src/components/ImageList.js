import React from 'react';
import PropTypes from 'prop-types';
import { Tiles, Box } from './grommet';
import Image from './Image';
import SelectedImageOverlay from './SelectedImageOverlay';
import Spinner from 'react-spinkit';
import { buildSrc } from './../actions/apiUtils';

const spinner = (
  <Box pad="medium" margin="medium" align="center" justify="center">
    <Spinner name="ball-scale-ripple-multiple" color="#6afff3"/>
  </Box>
);

const ImageList = ({
  isLoading,
  images,
  onImageClick,
  onCloseImage,
  selectedImageSrc
}) =>
  <Box pad="medium" onKeyDown={(e) => (e.key === 'Escape') ? onCloseImage() : null }>
    { isLoading && spinner }
    <Tiles fill pad={{vertical: 'small'}}>
      {
        images.map((image, i) => {
          const src = buildSrc({...image});
          return <Image key={`${image.id}-${i}`} src={src} onClick={() => onImageClick(src)} />;
        })
      }
    </Tiles>
    { selectedImageSrc && <SelectedImageOverlay onClose={onCloseImage} src={selectedImageSrc} /> }
  </Box>;

ImageList.propTypes = {
  images: PropTypes.array.isRequired,
  selectedImageSrc: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onCloseImage: PropTypes.func.isRequired
};

export default ImageList;
