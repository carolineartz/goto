import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { imageSelect, imageDeselect } from './../../actions/images';

import ImageList from './../ImageList';

class ImageListContainer extends Component {
  render() {
    return (
      <ImageList
        images={this.props.images}
        isLoading={false}
        selectedImageSrc={this.props.selectedImageSrc}
        onImageClick={this.props.selectImage}
        onCloseImage={this.props.deselectImage}
      />
    );
  }
}

ImageListContainer.propTypes = {
  deselectImage: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  selectedImageSrc: PropTypes.any,
  selectImage: PropTypes.func.isRequired,
};

const select = (state) => ({
  images: state.round.current.images,
  selectedImageSrc: state.images.selectedSrc,
});

const send = (dispatch) => ({
  deselectImage: () => dispatch(imageDeselect()),
  selectImage: (imageSrc) => dispatch(imageSelect(imageSrc)),
});


export default connect(select, send)(ImageListContainer);
