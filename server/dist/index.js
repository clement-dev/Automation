import PluginController from './controllers/PluginController';

"use strict";

var _PluginController = require('./controllers/PluginController');

var _PluginController2 = _interopRequireDefault(_PluginController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/requests', _PluginController2.default.getAllPluginsRequests);

app.get('/plugins', _PluginController2.default.getAllPluginsViews); 

app.post('/request/:requestId', _PluginController2.default.doRequest);

server.listen(port);