const targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';
const baseConfig = (mode) => ({
  type: 'map',
  theme: 'light',
  projection: 'miller',
  dataProvider: {
    map: 'worldLow'
  },
  areasSettings: {
    unlistedAreasColor: mode === 'dark' ? '#686a83' : '#BABCCA',
    outlineThickness: 0.2,
    outlineColor: mode === 'dark' ? '#141526' : '#ffffff'
  },
  imagesSettings: {
    autoZoom: true,
    color: '#fd5832',
    rollOverColor: '#fd5832',
    selectedColor: '#fd5832',
    pauseDuration: 0.2,
    animationDuration: 4,
    adjustAnimationSpeed: true
  },
  linesSettings: {
    color: mode === 'dark' ? '#ffffff' : '#141526',
    alpha: 1.0
  },
  export: { enabled: false }
});

export const makeMap = ({elementId, placeCoordinates, guessCoordinates, placeName, mode}) => {
  let { dataProvider, ...config } = baseConfig(mode);
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
      color: '#23b9d1',
      labelColor: '#23b9d1',
      rollOverColor: '#23b9d1',
      title: 'your guess',
      latitude: guessCoordinates.latitude,
      longitude: guessCoordinates.longitude
    }
  ];

  dataProvider = { lines: [line], images, ...dataProvider };
  return { dataProvider, ...config };
};
