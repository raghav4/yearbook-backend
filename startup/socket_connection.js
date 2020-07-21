const debug = require('debug')('app:socketConnection');
const { Message } = require('../models');

module.exports = async (io) => {
  debug('Connecting to socket.io...');
  // let interval;
  // const getApiAndEmit = (socket) => {
  //   const response = new Date();
  //   // Emitting a new message. Will be consumed by the client
  //   socket.emit('FromAPI', response);
  // };
  // io.on('connection', (socket) => {
  //   debug('New client connected');
  //   if (interval) {
  //     clearInterval(interval);
  //   }
  //   interval = setInterval(() => getApiAndEmit(socket), 1000);
  //   socket.on('disconnect', () => {
  //     debug('Client disconnected');
  //     clearInterval(interval);
  //   });
  // });
};
