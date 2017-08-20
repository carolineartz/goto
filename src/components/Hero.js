import React from 'react';
import { Box, Image } from './grommet';
import DotMap from './DotMap';
const Hero = () =>
  <Box
    align="center"
    justify="center"
    pad="medium"
    flex="grow"
    responsive
    size={{height: "large"}}
  >
    <Image id="logo" src="./../img/logo.svg" />
    <DotMap />
  </Box>

export default Hero;
