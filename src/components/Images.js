import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames  from 'classnames';
import disableScroll from 'disable-scroll';
import { getImageLocation, getImages } from './../actions/images';
import { createRound, roundDecreasePossiblePoints } from './../actions/rounds';

import { Image, Box, Tile, Tiles, Button, Layer } from './grommet';

import { buildSrc } from './../actions/apiUtils';

class Images extends Component {
  constructor(props) {
    super(props);
    this.handleLoadMorePhotos = this.handleLoadMorePhotos.bind(this);
    this.hideExpandedImage = this.hideExpandedImage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      imageIsExpanded: false,
      expandedImageSrc: ''
    };
  }

  componentDidMount() {
    this.handleInitialRequest();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.hasPhotos && !nextProps.placeId) {
      this.handleInitialRequest();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.hasPhotos && !!this.props.placeId) {
      this.handleImagesRequest();
    }
    if (!prevProps.placeId && !!this.props.placeId) {
      this.props.createRound({placeId: this.props.placeId});
    }
  }

  hideExpandedImage(e) {
    this.setState({imageIsExpanded: false});
    disableScroll.off();
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') this.hideExpandedImage(e);
  }

  handleClickTile(id, expandedImageSrc) {
    this.setState({imageIsExpanded: true, expandedImageSrc });
    disableScroll.on();
  }

  handleInitialRequest() {
    this.props.getLocation({round: this.props.round});
  }

  handleImagesRequest() {
    this.props.getImages({placeId: this.props.placeId, page: this.props.nextPage});
  }

  handleLoadMorePhotos() {
    this.handleImagesRequest();
    this.props.subtractPossiblePoints();
  }

  render() {
    const moreButtonClassName = classNames({
      disabled: !this.props.canLoadMore,
      'grommetux-button--accent-3': true,
      'grommetux-button--more': true
    });
    const images = this.props.photos.map((photoData, i) => {
      const key = `${photoData.id}-${i}`;
      const photoSrc = buildSrc({id: photoData.id, farmId: photoData.farm, secret: photoData.secret, serverId: photoData.server});
      return (
        <Tile pad="small" key={key} id={key} className='img' onClick={this.handleClickTile.bind(this, key, photoSrc)}>
          <Image alt="" src={photoSrc} />
        </Tile>
      );
    }
    );

    return (
      <Box pad="medium" onKeyDown={this.handleKeyDown}>
        <Tiles fill>
          {images}
        </Tiles>
        <Box basis="1/4" size="small" direction="row" wrap alignSelf="center" align="center" justify="center">
          <Button
            data-value={this.props.roundPossiblePoints}
            className={moreButtonClassName}
            disabled={!this.props.canLoadMore}
            label="More?"
            onClick={this.handleLoadMorePhotos}
          />
        </Box>
        <Layer
          className="image-expand-layer"
          hidden={!this.state.imageIsExpanded}
          closer={true}
          onClose={this.hideExpandedImage}
        >
          <Box size="large" basis="full"><Image alt="" fit="cover" src={this.state.expandedImageSrc} /></Box>
        </Layer>
      </Box>
    );
  }
}

const select = (state, props) => {
  return {
    placeId: state.images.placeId,
    nextPage: state.images.page + 1,
    hasPhotos: !!state.images.images.length,
    photos: state.images.images,
    roundPossiblePoints: state.rounds.roundPossiblePoints,
    canLoadMore: state.rounds.roundPossiblePoints > 10
  };
};

const send = (dispatch) => ({
  getLocation: ({round}) => dispatch(getImageLocation({round})),
  getImages: ({placeId, page}) => dispatch(getImages({placeId, page})),
  createRound: ({placeId}) => dispatch(createRound({placeId})),
  subtractPossiblePoints: () => dispatch(roundDecreasePossiblePoints())
});

export default connect(select, send)(Images);
