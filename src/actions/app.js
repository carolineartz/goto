export const DARK = 'dark';
export const LIGHT = 'light';

export const APP_CHANGE_MODE = 'APP_CHANGE_MODE';

export const COLOR_MODE_MAP = {
  [LIGHT]: '#bdbecb',
  [DARK]: '#505164'
};

export const appChangeMode = () =>
  (dispatch, getState) => {
    const toMode = getState().app.mode === LIGHT ? DARK : LIGHT;
    dispatch({
      type: APP_CHANGE_MODE,
      toMode
    });
    localStorage.setItem('mode', toMode);
  };

// export const appChangeMode = () => ({
//   type: APP_CHANGE_MODE
// });
