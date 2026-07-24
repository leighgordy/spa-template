import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import generateFavicons from "./plugins/generate-favicons.js";
import injectServiceWorker from "./plugins/inject-service-worker.js";
import siteConfig from "./site-config.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

const getMinifyOptions = (isProd) =>
  isProd && {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  };

export default {
  mode: isProd ? "production" : "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./assets/index.html",
      filename: "index.html",
      title: siteConfig.appName,
      metaDescription: siteConfig.metaDescription,
      publicSiteAddress: siteConfig.publicSiteAddress,
      isProduction: isProd,
      minify: getMinifyOptions(isProd),
    }),
    new HtmlWebpackPlugin({
      template: "./assets/404.html",
      filename: "404.html",
      title: `${siteConfig.appName} | Page Not Found `,
      metaDescription: "Sorry, the page you are looking for does not exist.",
      publicSiteAddress: siteConfig.publicSiteAddress,
      isProduction: isProd,
      minify: getMinifyOptions(isProd),
      inject: false,
    }),

    ...(isProd
      ? [
          new CopyPlugin({
            patterns: [{ from: "./assets/.htaccess", to: "." }],
          }),
          injectServiceWorker(__dirname),
          generateFavicons(__dirname, siteConfig),
        ]
      : []),
  ],
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    historyApiFallback: true,
  },
};
