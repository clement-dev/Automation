const PluginService = require('../services/PluginService');

class PluginController {
  constructor() {
    PluginService.loadPlugins();
  }

  getAllPluginsRequests(req, res) {
    res.end(JSON.stringify(PluginService.getPluginsRequests()));
  }

  getAllPluginsViews(req, res) {
    res.end(JSON.stringify(PluginService.getPluginsViews()));
  }

  addClientSocket(client) {
    PluginService.addClientSocket(client);
  }

  doRequest(req, res) {
    res.end(
      JSON.stringify(
        PluginService.doPluginRequest(req.params.requestId, req.body),
      ),
    );
  }
}

module.exports = new PluginController();
