import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames  from 'classnames';
import disableScroll from 'disable-scroll';

import { getImages, initialGetImages } from './../actions/images';
import { roundInitialize, createRound, roundDecreasePossiblePoints } from './../actions/rounds';
import { buildSrc } from './../actions/apiUtils';

import { Image, Box, Tile, Tiles, Button, Layer } from './grommet';
import Spinner from 'react-spinkit';

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

  componentWillMount() {
    this.props.getPlacesImages();
  }

  componentDidMount() {
    this.props.initializeGame();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.places.length && nextProps.places.length) {
      const placeId = nextProps.places[0].place_id;
      this.setState({placeId});
      this.props.createRound({placeId});
      this.handleImagesRequest({placeId});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.placeId && prevProps.hasPhotos) {
      const placeId = this.props.places[this.props.round.number - 1].place_id;
      this.setState({placeId});
      this.props.createRound({placeId});
      this.handleImagesRequest({placeId});
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

  handleImagesRequest({placeId, more = false} = {}) {
    this.props.getImages({placeId, page: this.props.nextPage, more});
  }

  handleLoadMorePhotos() {
    this.handleImagesRequest({placeId: this.state.placeId, more: true});
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
        {
          !this.props.photos.length &&
            <Box pad="medium" margin="medium" align="center" justify="center">
              <Spinner name="ball-scale-ripple-multiple" color="fuchsia"/>
            </Box>
        }
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
  const round = state.rounds.current;

  return {
    round,
    placeId: round.place.externalId || state.images.placeId,
    nextPage: state.images.page + 1,
    hasPhotos: !!state.images.images.length,
    photos: state.images.images,
    roundPossiblePoints: round.possiblePoints,
    canLoadMore: round.possiblePoints > 10,
    places: state.images.places
  };
};

const send = (dispatch) => ({
  getImages: ({placeId, page, more}) => dispatch(getImages({placeId, page, more})),
  createRound: ({placeId}) => dispatch(createRound({placeId})),
  initializeGame: () => dispatch(roundInitialize()),
  subtractPossiblePoints: () => dispatch(roundDecreasePossiblePoints()),
  getPlacesImages: () => dispatch(initialGetImages())
});

export default connect(select, send)(Images);
