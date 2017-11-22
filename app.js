require('dotenv').config();

module.exports = app => {
  app.beforeStart(async () => {
    // Add leanCloud config to config object.
    app.config.leanCloud = {
      appId: process.env.LEANC_APPID || null,
      key: process.env.LEANC_KEY || null,
      masterKey: process.env.LEANC_MASTER_KEY || null
    }
  });
};