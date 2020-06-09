import io from 'socket.io-client';

import store from '../../store';
import { signOut } from '../../modules/Auth/actions/user';

const socket = io('http://server:8080', { 
  autoConnect: false 
});

const socketAuthOpen = () => {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  const token = authorization && authorization.slice(7);

  socket.connect();

  socket.emit('authorization', token);
};

const socketAuthClose = () => {
  socket.disconnect();
};

socket.on('disconnect', () => {
  store.dispatch(signOut());
});

export { socketAuthOpen, socketAuthClose };
