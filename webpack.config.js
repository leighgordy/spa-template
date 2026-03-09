import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  mode:"development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
        new HtmlWebpackPlugin({
            template: './assets/index.html',
        }),
    ],
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
    },
};