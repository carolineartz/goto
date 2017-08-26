const COLORS = {
  africa: '#4c54a3',
  asia: '#fd5832',
  austrailia: '#23b9d1',
  europe: '#9fd4c8',
  northAmerica: '#ff8729',
  southAmerica: '#23b9d1'
};

const TRANSLATIONS = {
  africa: '427.000000, 213.000000',
  asia: '551.000000, 33.000000',
  austrailia: '778.000000, 341.000000',
  europe: '417.000000, 43.000000',
  northAmerica: '16.000000, 11.000000',
  southAmerica: '243.000000, 270.000000'
};

const MAXES = new Map([
  ['africa', 344],
  ['asia', 1316],
  ['austrailia', 1418],
  ['europe', 1702],
  ['northAmerica', 2469],
  ['southAmerica', 2685]
]);

const randomInterval = () => Math.round(Math.random() * (10000 - 7000) + 1);
const randomCircle = () => {
  const num = Math.round(Math.random() * (2685 - 1) + 1);
  return [
    num,
    `circle-${num}`
  ];
};

const getContinent = (num) => {
  for (let [continent, max] of MAXES) {
    if (num <= max) return continent;
  }
};

const randomClass = () => {
  const options = ['delay-1', 'delay-2', 'delay-3'];
  return options[Math.round(Math.random() * (3-1))];
};

const makeRipple = () => {
  // const appBody = document.querySelector(".grommetux-app");
  const [num, id] = randomCircle();
  const continent = getContinent(num);
  const translation = TRANSLATIONS[continent];
  const bg = COLORS[continent];

  const circle = document.getElementById(id);
  if (!circle) return;

  const coords = circle.getBoundingClientRect();
  const div = document.createElement('div');

  div.style.cssText = `
    transform: translate(${translation});
    border-radius: 50%;
    background-color: ${bg};
    position: absolute;
    bottom: ${coords.bottom}px;
    height: ${coords.height}px;
    width: ${coords.width}px;
    top: ${coords.top}px;
    left: ${coords.left}px;
    right: ${coords.right}px;
  `;
  div.className = `${continent} ripple ${randomClass()}`;
  div.setAttribute('id', `ripple-${num}`);
  return div;
};

const addRipple = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(makeRipple(), randomInterval()));
  });
};

async function createRipples() {
  const [
    firstRipple,
    secondRipple,
    thirdRipple,
    fourthRipple,
    fifthRipple
  ] = await Promise.all([addRipple(), addRipple(), addRipple(), addRipple(), addRipple()]);
  return [firstRipple, secondRipple, thirdRipple, fourthRipple, fifthRipple];
}


const makeRipples = () => {
  let time = 0;
  const appBody = document.querySelector('.grommetux-app');
  const appender = (ripple) => {
    appBody.appendChild(ripple); 
  };
  createRipples()
    .then(ripples => {
      ripples.forEach(ripple => {
        time += randomInterval();
        window.setTimeout(appender(ripple), time);
      });
    });
};

export { makeRipples };



