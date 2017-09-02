const targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

const baseConfig = {
  type: 'map',
  theme: 'black',
  projection: 'miller',
  dataProvider: {
    map: 'worldLow'
  },
  areasSettings: {
    unlistedAreasColor: '#9fd4c8',
    outlineThickness: 0.2,
    outlineColor: '#141526'
  },
  imagesSettings: {
    autoZoom: true,
    color: '#ff8729',
    rollOverColor: '#ff8729',
    selectedColor: '#ff8729',
    pauseDuration: 0.2,
    animationDuration: 4,
    adjustAnimationSpeed: true
  },
  linesSettings: {
    color: '#ff8729',
    alpha: 0.4
  },
  export: { enabled: false }
};

export const makeMap = ({elementId, placeCoordinates, guessCoordinates, placeName}) => {
  let { dataProvider, ...config } = baseConfig;
  const line = {
    id: `${elementId}-line`,
    arc: -0.85,
    alpha: 1,
    latitudes: [placeCoordinates.latitude, guessCoordinates.latitude],
    longitudes: [placeCoordinates.longitude, guessCoordinates.longitude]
  };
  const images = [
    {
      svgPath: targetSVG,
      title: placeName,
      latitude: placeCoordinates.latitude,
      longitude: placeCoordinates.longitude
    },
    {
      svgPath: targetSVG,
      title: 'your guess',
      latitude: guessCoordinates.latitude,
      longitude: guessCoordinates.longitude
    }
  ];

  dataProvider = { lines: [line], images, ...dataProvider };
  return { dataProvider, ...config };
};
