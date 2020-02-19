import { SHOW_POPUP, HIDE_POPUP } from '../consts';

export const showPopup = popupData => {
  return {
    type: SHOW_POPUP,
    payload: popupData
  };
};

export const hidePopup = () => {
  return {
    type: HIDE_POPUP
  };
};
