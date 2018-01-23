"use strict";

import pluginService from "../services/PluginService";

class PluginController {
    constructor() {
        pluginService.loadPlugins();
    }

    getAllPluginsRequests(req, res) {
        res.end(JSON.stringify(pluginService.getPluginsRequests()));
    }

    getAllPluginsViews(req, res) {
        res.end(JSON.stringify(pluginService.getPluginsViews()));
    }

    doRequest(req, res) {
        res.end(JSON.stringify(pluginService.doPluginRequest(req.params.requestId, req.body)));
    }
}

export default new PluginController();