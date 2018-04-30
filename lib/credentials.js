module.exports = {
  cookieSecret: "网站的密钥",
  mongo: {
    development: {
      connectionString: "mongodb://192.168.31.218/today"
    },
    production: {
      connectionString: ""
    }
  }
};
