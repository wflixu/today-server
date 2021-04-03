/* eslint valid-jsdoc: "off" */

'use strict';



const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617370494636_8828';

  // add your middleware config here
  config.middleware = [


  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      client: {
        url: 'mongodb://192.168.31.218:27017/today',
        options: {},
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
        plugins: []
      },
    },
    react: {
      enable: true,
      package: 'egg-view-react',
    },
    view: {
      defaultViewEngine: 'handlebars',
      defaultExtension: '.hbs',
      mapping: {
        '.hbs': 'handlebars',
      },
    }

  };

  return {
    ...config,
    ...userConfig,
  };
};


