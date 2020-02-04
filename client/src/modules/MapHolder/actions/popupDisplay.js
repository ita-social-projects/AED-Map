import { SHOW_POPUP, HIDE_POPUP } from '../consts';

export function showPopup(popupData) {
  return {
    type: SHOW_POPUP,
    payload: popupData
  };
}

export function hidePopup() {
  return {
    type: HIDE_POPUP
  };
}
