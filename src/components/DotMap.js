import React, { Component } from 'react';
import mapSvgData from './../data/mapSvgData';
import { makeRipples } from './../lib/rippleAnimation';

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

class DotMap extends Component {
  componentDidMount() {
    makeRipples();
  }

  render() {
    return (
      <svg id="dot-map" viewBox="0 0 985 467">
        <g>
          {
            mapSvgData.map(props => <Continent key={props.continent} {...props} />)
          }
        </g>
      </svg>
    );
  }
}

export default DotMap;
