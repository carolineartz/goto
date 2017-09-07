import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames  from 'classnames';

import { roundImagesLoadMore } from '../../actions/round';

import { Button, Box } from './../grommet';

const LoadMoreImages = ({
  round,
  canLoadMore,
  loadMore
}) => {
  const moreButtonClassName = classNames({
    disabled: !canLoadMore,
    'grommetux-button--accent-3': true,
    'grommetux-button--more': true
  });

  return (
    <Box basis="full" pad="medium" align="center">
      <Button
        className={moreButtonClassName}
        disabled={!canLoadMore}
        label="More?"
        onClick={() => canLoadMore ? loadMore(round) : null}
      />
    </Box>
  );
};

LoadMoreImages.propTypes = {
  round: PropTypes.any,
  canLoadMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired
};

const select = (state) => ({
  round: state.round.current,
  canLoadMore: state.round.current.possiblePoints > 10 && !state.round.guessCoordinates
});

const send =(dispatch) => ({
  loadMore: (round) => dispatch(roundImagesLoadMore(round)),
});

export default connect(select, send)(LoadMoreImages);
