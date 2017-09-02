import React, { Component } from 'react';
import AmCharts from '@amcharts/amcharts3-react';
import { connect } from 'react-redux';
import { makeMap } from './../data/ammapsData';

import {
  Box,
  Layer,
  Button,
  List,
  ListItem,
  WorldMap,
  Value,
  LocationIcon,
  FormAddIcon
} from './grommet';


class GameOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: props.show
    };
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') this.hide(e);
  }

  render() {
    const rounds = this.props.rounds;

    const roundSummary = rounds.map((round, i) => {
      const key = `roundOverview-${i}`;
      return (
        <ListItem key={key} justify='between'>
          <Value value={round.distance}
            icon={<LocationIcon />}
            label={round.place.name}
            units='mi'
            responsive
            size='medium'
            align='start'
          />
          <Box id={`round${i+1}-map`}>
            <AmCharts.React
              style={{width: '500px', height: '300px'}}
              options={makeMap({
                elementId: `round${round.number}-map`,
                placeCoordinates: round.place.coordinates,
                guessCoordinates: round.guess.coordinates,
                placeName: round.place.name
              })}
            />
          </Box>
        </ListItem>
      );
    });

    return (
      <Layer
        hidden={!this.props.show}
        id="game-overview-layer"
      >
        <Box pad="medium" full>
          <List>
            {roundSummary}
          </List>
        </Box>
      </Layer>
    );
  }
}

const select = (state) => ({
  rounds: state.rounds.gamesComplete ? state.rounds.all : [],
  show: state.rounds.gamesComplete
});

export default connect(select)(GameOverview);
