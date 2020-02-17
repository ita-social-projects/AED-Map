/* eslint-disable no-restricted-syntax */
import { useState, useEffect } from 'react';

let globalState = {
  open: false,
  severity: 'info',
  massage: ''
};

const listeners = [];

const useAlert = () => {
  const [, setState] = useState(globalState);
  const dispatch = newState => {
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      listener(globalState);
    }
  };
  // this runs only on on-mounting
  useEffect(() => {
    listeners.push(setState);
  // we pass setState in the dependencies array to ensure that our useEffect code will
  // execute only once, becouse setState does not change
  }, [setState]);
  return [globalState, dispatch];
};

export default useAlert;
