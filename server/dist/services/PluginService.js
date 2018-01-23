"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const fs = require('fs');

class PluginService {
    constructor() {
        this.plugins = [];
    }

    loadPlugins() {
        var pluginsFolder = "./plugins";
        this.plugins = [];
        fs.readdir(pluginsFolder, (err, files) => {
            files.forEach(file => {
                console.log("load plugin ..." + file);
                var tmpPlugin = require("../" + pluginsFolder + "/" + file + "/index.js").default;
                tmpPlugin.setService(this);
                this.plugins.push(tmpPlugin);
            });
        });
    }

    getPluginsRequests() {
        var allRequests = {};
        for (var i in this.plugins) {
            for (var j in this.plugins[i].getRequests()) {
                allRequests[j] = this.plugins[i].getRequests()[j];
            }
        }
        return allRequests;
    }



    doPluginRequest(requestId, data) {
        var tmpPlugin = this.getPluginByRequestId(requestId);
        if (tmpPlugin !== null) {
            return tmpPlugin.doRequest(requestId, data);
        } else {
            return "Je ne comprends pas";
        }
    }

    getPluginByRequestId(requestId) {
        for (var i in this.plugins) {
            for (var j in this.plugins[i].getRequests()) {
                if (requestId === j) {
                    return this.plugins[i];
                }
            }
        }
        return null;
    }
    
    getPluginsViews(){
        var allViews =[];
        for (var i in this.plugins){
            if(this.plugins[i].getView()){
                allViews.push(this.plugins[i].getView());
            }
        }
    return allViews;
    }
}

exports.default = new PluginService();