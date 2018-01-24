const Plugin = require('../../models/plugin');
const Sensor = require('./Sensor');

class SensorPlugin extends Plugin {
  constructor(path) {
    super(path);
    this.sensors = [];
  }

  doRequest(id, data) {
    return null;
  }

  getView() {
    this.view.list = this.config.sensors;
    for (let i in this.view.list) {
      this.view.list[i]['eventSubscribe'] = `serverSensor${
        this.view.list[i].name
      }Values`;
    }

    return this.view;
  }

  setService(service) {
    this.service = service;
    for (let i in this.config.sensors) {
      this.sensors[i] = new Sensor(
        this.config.sensors[i].name,
        this.config.sensors[i].period,
        this.config.sensors[i].script,
        this.service,
      );
      this.sensors[i].start();
    }
  }
}

module.exports = new SensorPlugin(__dirname);
