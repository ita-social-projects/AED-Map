import { SET_FILTER } from '../consts/filter';

const initialState = '';

export default function(filter = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return filter;
  }
}
