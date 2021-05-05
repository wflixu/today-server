"use strict";

/** @type Egg.EggPlugin */
module.exports = {

  // had enabled by egg
  static: {
    enable: true,
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  handlebars: {
    enable: true,
    package: "egg-view-handlebars",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  validate: {
    enable: true,
    package: "egg-validate",
  },
  bcrypt: {
    enable: true,
    package: "egg-bcrypt",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};
