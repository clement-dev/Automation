const fs = require('fs');

class PluginService {
  constructor() {
    this.plugins = [];
  }

  loadPlugins() {
    const pluginsFolder = './plugins';
    this.plugins = [];
    fs.readdir(pluginsFolder, (err, files) => {
      files.map(file => {
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
    } else {
      return 'Je ne comprends pas';
    }
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
}

module.exports = new PluginService();
