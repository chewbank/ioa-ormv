'use strict';

const app = require('@app');
const Ormv = require('@chewbank/ormv');
const consoln = require("@chewbank/consoln");

app.emit("loads", {
  "model": {
    "level": 20,
    before({ root: app }) {

      const config = app.config["@ioa/ormv"];

      if (config === undefined) {
        throw consoln.error(new Error(`在父组件${app.$name}中未找到“@ioa/ormv”配置项`));
      }

      app.Ormv = Ormv;
      
      const ormv = new Ormv(config);

      ormv.connect(error => {
        const name = config.database;
        if (error) {
          consoln.error(`database "${name}" connect fail`, error.stack);
        } else {
          consoln.success(`database "${name}" connect success`);
        }
      });

      app.ormv = ormv;

    }
  }
});

app.loader({
  "sync": {
    "level": 30
  },
});
