import { useState, useEffect } from 'react';

let globalState = {
  open: false,
  severity: 'info',
  message: ''
};

const listeners = [];

const useAlert = () => {
  const [, setState] = useState(globalState);

  const dispatch = newState => {
    globalState = { ...globalState, ...newState };

    listeners.forEach(listener => listener(globalState));
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners.splice(listeners.length - 1, 1);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export default useAlert;
