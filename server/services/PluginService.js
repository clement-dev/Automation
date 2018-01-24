const fs = require('fs');
const EventEmitter = require('events');

class PluginService {
  constructor() {
    this.plugins = [];
    this.clientsSockets = [];
    this.pluginsEvents = new EventEmitter();
  }

  loadPlugins() {
    const pluginsFolder = './plugins';
    this.plugins = [];
    fs.readdir(pluginsFolder, (err, files) => {
      files.forEach(file => {
        const loadedPlugin = require(`../${pluginsFolder}/${file}`);
        loadedPlugin.setService(this);
        this.plugins.push(loadedPlugin);
      });
    });
  }

  getPluginsRequests() {
    const allRequests = {};
    for (let i in this.plugins) {
      for (let j in this.plugins[i].getRequests()) {
        allRequests[j] = this.plugins[i].getRequests()[j];
      }
    }
    return allRequests;
  }

  doPluginRequest(requestId, data) {
    const tmpPlugin = this.getPluginByRequestId(requestId);
    if (tmpPlugin) {
      return tmpPlugin.doRequest(requestId, data);
    }

    return 'Je ne comprends pas';
  }

  getPluginByRequestId(requestId) {
    for (let i in this.plugins) {
      for (let j in this.plugins[i].getRequests()) {
        if (requestId === j) {
          return this.plugins[i];
        }
      }
    }

    return null;
  }

  getPluginsViews() {
    const allViews = [];
    for (let i in this.plugins) {
      if (this.plugins[i].getView()) {
        allViews.push(this.plugins[i].getView());
      }
    }

    return allViews;
  }

  addClientSocket(client) {
    for (let i in this.plugins) {
      this.plugins[i].subscribeEvent(client);
    }
    this.clientsSockets.push(client);
  }

  emitEvent(name, data) {
    for (let i in this.clientsSockets) {
      this.clientsSockets[i].emit(name, data);
    }
  }
}

module.exports = new PluginService();
