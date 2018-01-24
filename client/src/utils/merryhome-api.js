import axios from 'axios';

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

export { getRequestdata, sendRequest, getPluginsViews };
