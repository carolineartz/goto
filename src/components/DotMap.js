import React from 'react';
import PropTypes from 'prop-types';
import { Box } from './grommet';

const Continent = ({continent, transform, color, start, coordinates}) => (
  <g id={continent} transform={transform} stroke={color} strokeWidth="1" fill={color}>
    {
      coordinates.map(([x, y], i) =>
        <circle
          id={`circle-${start + i}`}
          key={`circle-${start + i}`}
          cx={x}
          cy={y}
          r="3"
        />
      )
    }
  </g>
);

Continent.propTypes = {
  continent: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired
};

const DotMap = ({mapData}) =>
  <Box flex="grow" size="large">
    <svg id="dot-map" viewBox="0 0 985 467">
      <g>{ mapData.map(continentProps =>
        <Continent key={continentProps.continent} {...continentProps} />) }
      </g>
    </svg>
  </Box>;

DotMap.propTypes = {
  mapData: PropTypes.array.isRequired
};

export default DotMap;
