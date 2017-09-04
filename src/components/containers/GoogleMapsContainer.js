import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
import Spinner from 'react-spinkit';

import { roundDropPin } from './../../actions/round';
import { gameHideMap } from './../../actions/game';
import GoogleMap from './../GoogleMap';

const GOOGLE_MAP_URL='https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyA5PXu1SlMk8pTR4zyFafNWe0AY4hoJnm4';

const GoogleMapsContainer = ({
  mapMarkers,
  dropPin,
  closeMap,
  mapIsShown,
  roundCompleted,
  mode
}) => (
  mapIsShown ?
    <GoogleMap
      markers={mapMarkers}
      onMapClick={(e) => !roundCompleted ? dropPin(e) : null}
      mode={mode}
      hidden={!mapIsShown}
      onCloseMap={closeMap}
      loadingElement={<Spinner name='double-bounce' />}
      googleMapURL={GOOGLE_MAP_URL}
      containerElement={
        <Rnd
          id="google-maps-overlay"
          disableDragging
          default={{ x: window.innerWidth - 420, y: window.innerHeight - 300, width: 420, height: 300}}
          z={3}
          style={{
            backgroundColor: '#05060a',
            display: 'block',
            boxShadow: '0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)',
            padding: '.25rem'
          }}
        />
      }
      mapElement={<div style={{ height: '100%', width: '100%' }} />}
    /> :
    <div />
);

GoogleMapsContainer.propTypes = {
  mode: PropTypes.string.isRequired,
  roundCompleted: PropTypes.bool.isRequired,
  mapIsShown: PropTypes.bool.isRequired,
  mapMarkers: PropTypes.array.isRequired,
  dropPin: PropTypes.func.isRequired,
  closeMap: PropTypes.func.isRequired
};

const send = (dispatch) => ({
  closeMap: () => dispatch(gameHideMap()),
  dropPin: (event) => dispatch(roundDropPin(event))
});

const select = (state, ownProps) => ({
  mapMarkers: state.round.markers,
  roundCompleted: !!(state.round.current && state.round.guessCoordinates),
  mapIsShown: state.game.mapIsShown,
});

export default connect(select, send)(GoogleMapsContainer);
