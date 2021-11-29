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
    'errorHandler',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/today',
        options: {
          autoReconnect: true,
        },
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
        plugins: [],
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
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      // domainWhiteList: ['http://localhost:3000']
    },
    multipart: {
      fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ],
    },
    bcrypt: {
      saltRounds: 10, // default 10
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    jwt: {
      secret: 'Great4-M',
      enable: true, // default is false
      match: '/jwt', // optional
    },

  };

  return {
    ...config,
    ...userConfig,
  };
};

