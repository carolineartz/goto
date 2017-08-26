export const CHANGE_APP_MODE = 'CHANGE_APP_MODE';

export const DARK = 'dark';
export const LIGHT = 'light';

export const COLOR_MODE_MAP = {
  [LIGHT]: '#bdbecb',
  [DARK]: '#505164'
};

export const changeAppMode = (mode) => ({
  type: CHANGE_APP_MODE,
  mode
});
