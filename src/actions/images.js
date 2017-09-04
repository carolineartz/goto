import disableScroll from 'disable-scroll';
import { appDisableScroll, appEnableScroll } from './app';

export const IMAGE_SELECT = 'IMAGE_SELECT';
export const IMAGE_DESELECT = 'IMAGE_DESELECT';

const _imageSelect = (imageSrc) => ({
  type: IMAGE_SELECT,
  imageSrc
});

const _imageDeselect = () => ({
  type: IMAGE_DESELECT
});

export const imageSelect = (imageSrc) =>
  (dispatch) => {
    dispatch(appDisableScroll());
    disableScroll.on();
    dispatch(_imageSelect(imageSrc));
  };

export const imageDeselect = () =>
  (dispatch) => {
    dispatch(appEnableScroll());
    disableScroll.off();
    dispatch(_imageDeselect());
  };


