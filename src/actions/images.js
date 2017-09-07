import disableScroll from 'disable-scroll';

export const IMAGE_SELECT = 'IMAGE_SELECT';
export const IMAGE_DESELECT = 'IMAGE_DESELECT';

export const imageSelect = (imageSrc) =>
  (dispatch) => {
    disableScroll.on();
    dispatch({type: IMAGE_SELECT, imageSrc});
  };

export const imageDeselect = () =>
  (dispatch) => {
    disableScroll.off();
    dispatch({type: IMAGE_DESELECT});
  };


