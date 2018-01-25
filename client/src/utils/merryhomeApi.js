import axios from 'axios';
import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_API_URI);

const getRequestdata = () =>
  axios
    .get(`${process.env.REACT_APP_API_URI}/requests`)
    .then(response => response.data);

const getPluginsViews = () =>
  axios
    .get(`${process.env.REACT_APP_API_URI}/plugins`)
    .then(response => response.data);

const sendRequest = (requestId, requestData) =>
  axios
    .post(`${process.env.REACT_APP_API_URI}/request/${requestId}`, requestData)
    .then(response => response.data);

const subscribeToEvent = (name, callback) => socket.on(name, callback);

const emitEvent = (name, data) => socket.emit(name, data);

export {
  getRequestdata,
  sendRequest,
  getPluginsViews,
  subscribeToEvent,
  emitEvent,
};
