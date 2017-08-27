import React, { Component } from 'react';
import disableScroll from 'disable-scroll';
import { connect } from 'react-redux';

import {
  Box,
  Layer,
  Button
} from './grommet';


class GameOverview extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      shown: false
    };
  }

  hide(e) {
    this.setState({shown: false});
    disableScroll.off();
  }

  show() {

  }

  handleKeyDown(e) {
    if (e.key === 'Escape') this.hide(e);
  }

  render() {
    if (this.state.shown) disableScroll.on();

    return (
      <Layer
        hidden={!this.state.shown}
        closer={true}
        onClose={this.hide}
      >
        <Box pad="medium" full>
          Hello
        </Box>
      </Layer>
    );
  }
}

const select = (state) => ({
  show: state.rounds.current.number === 5
});

export default connect(select)(GameOverview);
