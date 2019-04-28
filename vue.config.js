const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, "src/components"),
        Pages: path.resolve(__dirname, "src/pages"),
        Constants: path.resolve(__dirname, "src/constants"),
        Services: path.resolve(__dirname, "src/services"),
        Assets: path.resolve(__dirname, "src/assets"),
        Store: path.resolve(__dirname, "src/store")
      }
    },
    devtool: "eval-source-map"
  }
};
