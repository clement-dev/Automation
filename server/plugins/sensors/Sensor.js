const child = require('child_process');
const path = require('path');
const schedule = require('node-schedule');

const options = {
  encoding: 'UTF-8',
};

class Sensor {
  constructor(name, period, script, service) {
    this.name = name;
    this.period = period;
    this.script = path.resolve(__dirname, `lib/${script}`);
    this.job = null;
    this.service = service;
  }

  start() {
    const obj = this;
    setTimeout(() => {
      const command = `python ${obj.script}`;
      const process = child.exec(command, options, (error, stdout, stderr) => {
        console.log(`serverSensor${obj.name}Values`);
        console.log(stdout);
        try {
          obj.service.emitEvent(
            `serverSensor${obj.name}Values`,
            JSON.parse(stdout),
          );
          obj.service.pluginsEvents.emit(
            `serverSensor${obj.name}Values`,
            JSON.parse(stdout),
          );
        } catch (e) {
          console.log(e);
        }

        if (error) {
          console.log(stderr);
        }
      });

      obj.start();
    }, this.period);
  }
}

module.exports = Sensor;
