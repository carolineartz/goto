import React from 'react';
import PropTypes from 'prop-types';
import { Box } from './grommet';
import DotMap from './DotMap';
import ModeSwitcher from './ModeSwitcher';
import Logo from './Logo';

const Hero = ({mode}) =>
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
    <ModeSwitcher mode={mode} />
    <Box flex="grow" size="large"><DotMap /></Box>
  </Box>;

Hero.propTypes = {
  mode: PropTypes.string.isRequired
};

export default Hero;
