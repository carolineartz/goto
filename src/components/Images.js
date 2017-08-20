import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getImageLocation, getImages } from './../actions/images';
import { createRound } from './../actions/rounds';

import { Box, Tile, Tiles } from './grommet';

import { buildSrc } from './../actions/apiUtils';

// const buildSrc = ({farmId, serverId, id, secret}) => `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`

class Images extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMorePhotos = this.handleLoadMorePhotos.bind(this);
  }

  componentDidMount() {
    this.handleInitialRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.hasPhotos && !!this.props.placeId) {
      this.handleImagesRequest();
    }
    if (!prevProps.placeId && !!this.props.placeId) {
      this.props.createRound({placeId: this.props.placeId});
    }
  }

  handleInitialRequest() {
    this.props.getLocation({round: this.props.round})
  }

  handleImagesRequest() {
    this.props.getImages({placeId: this.props.placeId, page: this.props.nextPage});
  }

  handleLoadMorePhotos() {
    this.handleImagesRequest()
  }

  render() {
    const images = this.props.photos.map((photoData, i) =>
      <Tile pad="small" key={`${photoData.id}-${i}`} className='img'>
        <img alt="" src={buildSrc({id: photoData.id, farmId: photoData.farm, secret: photoData.secret, serverId: photoData.server})} />
      </Tile>
    );

    return (
      <Box pad="medium">
        <Tiles size="small" fill flush>
          {images}
        </Tiles>
        <Box basis="1/4" size="small" direction="row" wrap alignSelf="center" align="center" justify="center">
          <button onClick={this.handleLoadMorePhotos}>More?</button>
        </Box>
      </Box>
    );
  }
}

const select = (state, props) => {
 return {
  placeId: state.images.placeId,
  nextPage: state.images.page + 1,
  hasPhotos: !!state.images.images.length,
  photos: state.images.images
 }
}

const send = (dispatch) => ({
  getLocation: ({round}) => dispatch(getImageLocation({round})),
  getImages: ({placeId, page}) => dispatch(getImages({placeId, page})),
  createRound: ({placeId}) => dispatch(createRound({placeId}))
})

export default connect(select, send)(Images);
