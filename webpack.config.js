const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/App.js",
    output: {
        filename: "bundle.[hash].js",
        // filename: 'index.bundle.js',
        path: path.resolve(__dirname, "/dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // filename: "./index.html"
        }), new MiniCssExtractPlugin()
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                // test: /\.jsx?$/,
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
                // use:{loader: "babel-loader"}
            },
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "sass-loader",]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    devServer: {
        port: 3000,
        watchContentBase: true
    },
};