import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap as GGoogleMap, Marker, Polyline } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

// import { light, dark, alt } from './../data/mapStyles';
import { light, alt } from './../data/mapStyles';

const GoogleMap = withScriptjs(withGoogleMap(props =>
  <GGoogleMap
    defaultZoom={2}
    defaultCenter={{lat: 40.363882, lng: 231.044922}}
    defaultOptions={{styles: (props.mode === 'dark') ? alt : light}}
    onClick={props.onMapClick}
  >
    {
      props.markers.map((marker, i) => {
        let { type, position } = marker;
        return (
          <Marker
            key={`marker-${i}`}
            position={position}
            icon={`./../../img/${type}-simple.svg`} />
        );
      })
    }
    { (props.markers.length === 2) &&
      <Polyline
        path={props.markers.map(m => m.position)}
        geodesic={true}
        options={{
          strokeColor: props.mode === 'dark' ? '#ECEFFF' : '#141526',
          strokeWeight: 3,
          strokeLineCap: 'round',
          strokeOpacity: 1.0
        }}
      />
    }
  </GGoogleMap>
));

GoogleMap.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onCloseMap: PropTypes.func.isRequired
};

export default GoogleMap;
