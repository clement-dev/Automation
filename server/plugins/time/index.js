"use strict";

import Plugin from "../../models/plugin.js";

class TimePlugin extends Plugin {
    doRequest(id, data) {
        console.log('req:' + id);
        switch(id) {
            case "time":
                var now = new Date();
                var response = "Il est " + now.getHours() + " heure " + now.getMinutes();
                console.log('resp:' + response);
                return response;
        }
        return null;
    }
}

export default new TimePlugin(__dirname);