import React, { Component } from 'react';
import classNames  from 'classnames';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit'

import { roundSelectMapLocation, roundGuessLocation } from './../actions/rounds';

import GMap from './../components/GMap';
import { Meter, Value, Header, Label, Box, Menu, Anchor, MoreIcon, Layer } from './grommet';

const GOOGLE_MAP_URL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyA5PXu1SlMk8pTR4zyFafNWe0AY4hoJnm4"

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.showMap = this.showMap.bind(this);
    this.hideMap = this.hideMap.bind(this);
    this.state = {
      mapIsShown: false
    }
  }

  showMap() {
    this.setState({mapIsShown: true})
  }

  hideMap() {
    this.setState({mapIsShown: false})
  }

  handleClickMap(event) {
    const guessCoordinates = {
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    }
    this.props.dropPin({guessCoordinates})
  }

  render() {
    const className = classNames({ fixed: this.props.fixed })

    return (
      <Header size="small" className={className}>
        <Box basis="full" flex="grow" direction="row" justify="between" align="center">
          <Box style={{paddingRight: "0"}} pad={{horizontal: "medium", vertical: "small"}} size="small">
            <Value value={100}
              align='start'
              size="small"
              units='possible points this round'
            />
              <Meter vertical={false} value={100} />
              <Box direction='row'
                justify='between'
                pad={{"between": "small"}}
                responsive={false}>
                <Label size='small'>0</Label>
                <Label size='small'>100</Label>
              </Box>
           </Box>
          <Box justify="start" pad={{horizontal: "medium", vertical: "small"}}>
            <Value value={100}
              label='Total Points'
              units='/ 500' />
          </Box>
          <Box><button onClick={() => { this.props.makeGuess({guessCoordinates: this.props.guessCoordinates, targetCoordinates: this.props.targetCoordinates}) }}>Guess</button></Box>
          <Box><button onClick={() => this.showMap()}>Map</button></Box>
        </Box>
        <Layer
          hidden={!this.state.mapIsShown}
          closer={true}
          onClose={this.hideMap}
          >
            <GMap
              loadingElement={<Spinner name='double-bounce' />}
              googleMapURL={GOOGLE_MAP_URL}
              containerElement={<Box className="container-element"  size={{height: 'medium', width: {max: "medium"}}} />}
              mapElement={<div style={{ height: `100%` }} />}
              onMapClick={this.handleClickMap}
              markers={this.props.markers}
            />
        </Layer>
      </Header>
    )
  }
}

const select = (state) => {
  const { latitude, longitude } = state.rounds.currentRound.place.place;
  return {
    targetCoordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
    guessCoordinates: state.rounds.guessCoordinates,
    markers: state.rounds.markers
  }
}

const send = (dispatch) => ({
  makeGuess: ({guessCoordinates, targetCoordinates }) =>
    dispatch(roundGuessLocation({guessCoordinates, targetCoordinates})),
  dropPin: ({guessCoordinates}) => dispatch(roundSelectMapLocation({guessCoordinates}))
})

export default connect(select, send)(MyHeader);
