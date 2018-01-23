import axios from 'axios';

// eslint-disable-next-line
// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://172.16.16.146';
export {getRequestdata,sendRequest,getPluginsViews};

function getRequestdata(){
  const url = BASE_URL + '/requests';
  return axios.get(url).then(response => response.data);
}

function getPluginsViews(){
  const url = BASE_URL + '/plugins';
  return axios.get(url).then(response => response.data);
}

function sendRequest(requestId,requestData){
  const url = BASE_URL +  '/request/'+requestId;
  return axios.post(url,requestData).then(response =>  response.data);
}
