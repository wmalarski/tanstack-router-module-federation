const rspack = require("@rspack/core");
const dependencies = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("@rspack/core").container;

const path = require("node:path");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  devServer: {
    headers: {
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    hot: true,
    port: 4175,
  },
  entry: {
    index: "./src/index.jsx",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      exposes: {
        "./bookmarks-router": "./src/Team",
      },
      filename: "remoteEntry.js",
      name: "team",
      shared: {
        ...dependencies,
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true,
        },
      },
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
};
