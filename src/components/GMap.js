import React from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { light, dark } from './../data/mapStyles';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
const GMap = withScriptjs(withGoogleMap(props => {
  const markers = props.markers || [];
  const line = <Polyline
    path={markers.map(m => m.position)}
    geodesic={true}
    options={{
      strokeColor: '#ECEFFF',
      strokeWeight: 3,
      strokeLineCap: 'round',
      strokeOpacity: 1.0
    }}
  />;

  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{lat: 45.363882, lng: 231.044922}}
      defaultOptions={{styles: (props.mode === 'dark') ? dark : light}}
      onClick={props.onMapClick}
    >
      {
        markers.map((marker, i) => {
          let { type, position } = marker;
          return (
            <Marker
              key={`marker-${i}`}
              position={position}
              icon={`./../img/${type}-simple.svg`} />
          );
        })
      }
      { (markers.length === 2) && line }
    </GoogleMap>
  );
}));

export default GMap;
