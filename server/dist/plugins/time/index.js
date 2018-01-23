"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _plugin = require("../../models/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimePlugin extends _plugin2.default {
    doRequest(id, data) {
        console.log('req:' + id);
        switch (id) {
            case "time":
                var now = new Date();
                var response = "Il est " + now.getHours() + " heure " + now.getMinutes();
                console.log('resp:' + response);
                return response;
        }
        return null;
    }
}

exports.default = new TimePlugin(__dirname);