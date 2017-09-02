import React from 'react';
import { connect } from 'react-redux';
import { Box } from './grommet';
import DotMap from './DotMap';
import ModeSwitcher from './ModeSwitcher';
import Logo from './Logo';

const Hero = (props) =>
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
    <Box className="logo-main-container" justify="center" align="center" size="medium"><Logo /></Box>
    <ModeSwitcher mode={props.mode} />
    <Box flex="grow" size="large"><DotMap /></Box>
  </Box>;

const select = (state, props) => ({
  mode: state.app.mode
});
export default connect(select)(Hero);
