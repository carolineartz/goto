import React, { Component } from 'react';
import classNames  from 'classnames';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import { roundSelectMapLocation, roundGuessLocation } from './../actions/rounds';
import { clearImages } from './../actions/images';

import RoundStatus from './RoundStatus';
import GMap from './GMap';
import {
  Meter,
  Value,
  Header,
  Label,
  Box,
  Layer,
  Button,
  MapLocationIcon,
  CompassIcon,
  PlayIcon
} from './grommet';

const GOOGLE_MAP_URL='https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyA5PXu1SlMk8pTR4zyFafNWe0AY4hoJnm4';

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClickMakeGuess = this.handleClickMakeGuess.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.handleClickNextRound = this.handleClickNextRound.bind(this);
    this.showMap = this.showMap.bind(this);
    this.hideMap = this.hideMap.bind(this);
    this.state = {
      mapIsShown: false,
      pinDropped: false,
      hasGuess: this.props.hasGuess
    };
  }

  showMap() {
    this.setState({mapIsShown: !this.state.mapIsShown}); 
  }

  hideMap() {
    this.setState({mapIsShown: false}); 
  }

  handleClickMap(event) {
    const guessCoordinates = {
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    };
    this.setState({pinDropped: true});
    this.props.dropPin({guessCoordinates});
  }

  handleClickMakeGuess() {
    if (!this.state.hasGuess) {
      this.props.makeGuess({
        guessCoordinates: this.props.guessCoordinates,
        targetCoordinates: this.props.targetCoordinates
      });
      this.setState({hasGuess: true});
    }
    else {
      return null; 
    }
  }

  handleClickNextRound() {
    this.props.startNextRound();
    this.setState({hasGuess: false});
  }

  render() {
    const { hasGuess, hasRoundScore, roundPossiblePoints, totalScore, mode, markers } = this.props;
    const { mapIsShown } = this.state;
    const guessBtnClass = classNames({disabled: !hasGuess});
    const mapLayerClass = classNames({visible: mapIsShown});
    const mapButtonLabel = mapIsShown ? 'Hide' : 'Show';

    return (
      <Header style={{...this.props.style}} size="small">
        <Box basis="full" flex="grow" direction="row" justify="between" align="center">
          <Box style={{paddingRight: '0'}} pad={{horizontal: 'medium', vertical: 'small'}} size="small">
            <RoundStatus />
            <Value value={roundPossiblePoints}
              align='start'
              size="small"
              units='possible points this round'
            />
            <Meter vertical={false} data-value={roundPossiblePoints} value={roundPossiblePoints} />
            <Box direction='row'
              justify='between'
              pad={{'between': 'small'}}
              responsive={false}>
              <Label size='small'>0</Label>
              <Label size='small'>100</Label>
            </Box>
          </Box>
          <Box justify="start" pad={{horizontal: 'medium', vertical: 'none'}}>
            <Value value={totalScore}
              label='Total Points'
              units='/ 500' />
          </Box>
          <Box pad={{horizontal: 'small', vertical: 'none'}}>
            {
              (hasGuess || !hasGuess && !hasRoundScore) ?
                <Button
                  style={{width: '188px'}}
                  className={guessBtnClass}
                  disabled={!hasGuess}
                  accent
                  icon={<CompassIcon />}
                  label="Submit Guess"
                  onClick={this.handleClickMakeGuess}
                /> :
                <Button
                  style={{width: '188px'}}
                  className="grommetux-button__accent-3"
                  icon={<PlayIcon />}
                  label="Next Round"
                  onClick={this.handleClickNextRound}
                />
            }
          </Box>
          <Box pad={{horizontal: 'medium', vertical: 'none'}}>
            <Button
              style={{width: '162px'}}
              className="grommetux-button__accent-2"
              icon={<MapLocationIcon />}
              label={`${mapButtonLabel} Map`}
              onClick={this.showMap}
            />
          </Box>
        </Box>
        <Layer
          id="google-maps-layer"
          className={mapLayerClass}
          hidden={!mapIsShown}
          closer
          onClose={this.hideMap}
        >
          <GMap
            mode={mode}
            loadingElement={<Spinner name='double-bounce' />}
            googleMapURL={GOOGLE_MAP_URL}
            containerElement={<Box className="container-element" style={{height: '255px', width: '388px'}} />}
            mapElement={<div style={{ height: '255px', width: '388px' }} />}
            onMapClick={this.handleClickMap}
            markers={markers}
          />
        </Layer>
      </Header>
    );
  }
}

const select = (state) => {
  const { latitude, longitude } = state.rounds.currentRound.place.place;

  return {
    targetCoordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
    guessCoordinates: state.rounds.guessCoordinates,
    markers: state.rounds.markers,
    hasRoundScore: state.rounds.hasRoundScore,
    hasGuess: state.rounds.markers.length === 1,
    totalScore: state.rounds.totalScore,
    roundPossiblePoints: state.rounds.roundPossiblePoints,
    mode: state.app.mode
  };
};

const send = (dispatch) => ({
  makeGuess: ({guessCoordinates, targetCoordinates }) =>
    dispatch(roundGuessLocation({guessCoordinates, targetCoordinates})),
  dropPin: ({guessCoordinates}) => dispatch(roundSelectMapLocation({guessCoordinates})),
  startNextRound: () => dispatch(clearImages())
});

export default connect(select, send)(MyHeader);
