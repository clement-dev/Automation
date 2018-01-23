"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PluginService = require("../services/PluginService");

var _PluginService2 = _interopRequireDefault(_PluginService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PluginController {
    constructor() {
        _PluginService2.default.loadPlugins();
    }

    getAllPluginsRequests(req, res) {
        res.end(JSON.stringify(_PluginService2.default.getPluginsRequests()));
    }

    getAllPluginsViews(req, res) {
        res.end(JSON.stringify(_PluginService2.default.getPluginsViews()));
    }

    doRequest(req, res) {
        res.end(JSON.stringify(_PluginService2.default.doPluginRequest(req.params.requestId, req.body)));
    }
}

exports.default = new PluginController();