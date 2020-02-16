import io from 'socket.io-client';

import store from '../../store';
import { signOut } from '../../modules/Auth/actions/user';

const socket = io('http://localhost:3012');

let watcher;

const watcherStart = () => {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  const token = authorization && authorization.slice(7);

  watcher = setInterval(() => {
    socket.emit('authorization', token);
  }, 1000);
};

const watcherStop = () => {
  clearInterval(watcher);
};

socket.on('signout', () => {
  watcherStop();
  store.dispatch(signOut());
});

socket.on('disconnect', () => {
  watcherStop();
  store.dispatch(signOut());
});

export { watcherStart, watcherStop };
