import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Box } from './../grommet';
import { makeRipples } from './../../lib/rippleAnimation';
import MAP_DATA from './../../data/mapSvgData';

import DotMap from './../DotMap';
import { MainLogo } from './../Logo';
import ToggleModeButton from './../ToggleModeButton';

import { appChangeMode } from './../../actions/app';

class HeroContainer extends Component {
  componentDidMount() {
    makeRipples();
  }

  render() {
    return (
      <Box
        id="hero"
        full
        align="center"
        justify="center"
        pad={{vertical: 'large', horizontal: 'medium'}}
        margin={{vertical: 'medium'}}
        flex="grow"
        responsive
        direction="row"
        size={{height: 'large'}}
      >
        <MainLogo />
        <ToggleModeButton
          mode={this.props.mode}
          onClickToggleMode={this.props.onClickToggleMode}
        />
        <DotMap mapData={MAP_DATA} />
      </Box>
    );
  }
}

HeroContainer.propTypes = {
  mode: PropTypes.string.isRequired,
  onClickToggleMode: PropTypes.func.isRequired
};

const select = (state, props) => ({
  mode: state.app.mode
});

const send = (dispatch, ownProps) =>  ({
  onClickToggleMode: () => dispatch(appChangeMode())
});

export default connect(select, send)(HeroContainer);
