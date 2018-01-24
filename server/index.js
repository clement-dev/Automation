const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
require('dotenv').load();
const bodyParser = require('body-parser');
const io = require('socket.io')(server, { pingTimeout: 30000 });
const PluginController = require('./controllers/PluginController');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/requests', PluginController.getAllPluginsRequests);
app.get('/plugins', PluginController.getAllPluginsViews);
app.post('/request/:requestId', PluginController.doRequest);

io.sockets.on('connection', client => PluginController.addClientSocket(client));

server.listen(port);
