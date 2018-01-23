"use strict";

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

import pluginController from "./controllers/PluginController";

app.get('/requests', pluginController.getAllPluginsRequests);

app.get('/plugins', pluginController.getAllPluginsViews); 

app.post('/request/:requestId', pluginController.doRequest);

server.listen(port);