const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
require('dotenv').load();
const bodyParser = require('body-parser');
const PluginController = require('./controllers/PluginController');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/requests', PluginController.getAllPluginsRequests);
app.get('/plugins', PluginController.getAllPluginsViews);
app.post('/request/:requestId', PluginController.doRequest);

server.listen(port);
