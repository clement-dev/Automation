const Plugin = require('../../models/plugin');

class TimePlugin extends Plugin {
  doRequest(id, data) {
    switch (id) {
      case 'time':
        const now = new Date();

        return `Il est ${now.getHours()} heure ${now.getMinutes()}`;
    }

    return null;
  }
}

module.exports = new TimePlugin(__dirname);
