import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames';
import { connect } from 'react-redux';

import { getImages } from '../../actions/images';

import { Button } from './../grommet';

let LoadMoreImages = ({nextPage, placeId, canLoadMore, loadMoreImages}) => {
  const moreButtonClassName = classNames({
    disabled: !canLoadMore,
    'grommetux-button--accent-3': true,
    'grommetux-button--more': true
  });

  return (
    <Button
      className={moreButtonClassName}
      disabled={!canLoadMore}
      label="More?"
      onClick={() => loadMoreImages({placeId, page: nextPage})}
    />
  );
};

LoadMoreImages.propTypes = {
  nextPage: PropTypes.number.isRequired,
  placeId: PropTypes.string.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  loadMoreImages: PropTypes.func.isRequired
};

const select = (state) => ({
  nextPage: state.images.page + 1,
  placeId: state.round.current.place.externalId || state.images.placeId,
  canLoadMore: state.round.current.possiblePoints > 10
});

const send =(dispatch) => ({
  loadMoreImages: ({placeId, page}) => dispatch(getImages({placeId, page, more: true})),
});

LoadMoreImages = connect(select, send)(LoadMoreImages);

export default LoadMoreImages;
