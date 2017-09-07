import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames  from 'classnames';

import { roundImagesLoadMore } from '../../actions/round';

import { Button, Box } from './../grommet';

const LoadMoreImages = ({
  canLoadMore,
  loadMore,
  round,
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
  canLoadMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  round: PropTypes.any,
};

const select = (state) => ({
  canLoadMore: state.round.current.possiblePoints > 10 && !state.round.guessCoordinates,
  round: state.round.current,
});

const send =(dispatch) => ({
  loadMore: (round) => dispatch(roundImagesLoadMore(round)),
});

export default connect(select, send)(LoadMoreImages);
