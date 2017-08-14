import React from 'react';
import { WorldMap, Box, Image } from './grommet';

const HeroMap = ({}) =>
  <Box
    align="center"
    justify="center"
    pad="medium"
    flex="grow"
    responsive
    size={{height: "large"}}
  >
    <Image id="logo" src="./../img/logo.svg" />
    <WorldMap series={[{
      "continent": "NorthAmerica",
      "label": "North America",
      "colorIndex": "accent-1",
    }, {
      "continent": "SouthAmerica",
      "label": "South America",
      "colorIndex": "accent-3",
    }, {
      "continent": "Europe",
      "label": "Europe",
      "colorIndex": "accent-5",
    }, {
      "continent": "Africa",
      "label": "Africa",
      "colorIndex": "accent-4",
    }, {
      "continent": "Asia",
      "label": "Asia",
      "colorIndex": "accent-2",
    }, {
      "continent": "Australia",
      "label": "Australia",
      "colorIndex": "accent-3",
    }]} />
  </Box>

export default HeroMap;
