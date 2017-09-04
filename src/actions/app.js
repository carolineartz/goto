export const DARK = 'dark';
export const LIGHT = 'light';

export const APP_CHANGE_MODE = 'APP_CHANGE_MODE';
export const APP_DISABLE_SCROLL = 'APP_DISABLE_SCROLL';
export const APP_ENABLE_SCROLL = 'APP_ENABLE_SCROLL';

export const COLOR_MODE_MAP = {
  [LIGHT]: '#bdbecb',
  [DARK]: '#505164'
};

export const appChangeMode = (mode) => ({
  type: APP_CHANGE_MODE,
  mode
});

export const appDisableScroll = () => ({
  type: APP_DISABLE_SCROLL
});

export const appEnableScroll = () => ({
  type: APP_ENABLE_SCROLL
});
