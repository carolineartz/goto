export const DARK = 'dark';
export const LIGHT = 'light';

export const APP_CHANGE_MODE = 'APP_CHANGE_MODE';

export const COLOR_MODE_MAP = {
  [LIGHT]: '#bdbecb',
  [DARK]: '#505164'
};

export const appChangeMode = (mode) => ({
  type: APP_CHANGE_MODE,
  mode
});
