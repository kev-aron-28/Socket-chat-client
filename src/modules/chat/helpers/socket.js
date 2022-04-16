import io from 'socket.io-client';
import store from '../../../store/index'

let socket = null
if (process.env.NODE_ENV === 'development') {
    socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
} else {
    socket = io('/');
}

store.dispatch('assignSocket', socket);

export default socket