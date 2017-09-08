var webpack = require("webpack"),
    path = require("path");

module.exports = {
    entry:{
        app: "./app/bootstrap.ts",
        vendor:"./app/vendor.ts"
    },
     /** resolve condition */
    resolve: {
        /** file extensions */
        extensions: ['.ts', '.js', '.vue']
    },

    /** output files */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist'),
        chunkFilename: '[name]-[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var'
    },

    /** modules */
    module: {
        /** Rules with Loaders */
        rules: [
            {
                test: /\.ts$/,
                exclude: [
                   //path.resolve(__dirname, './nod')
                ],
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'app/tsconfig.json')
                        }
                    }
                    ,{
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'to-string-loader'
                    },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: { 
                            mimetype: 'image/png' 
                       }
            }
            ,{
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ],

        /** warnings */
        exprContextCritical: false
    },

    /** plugins */
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname),
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            children: true,
            async: true,
            minChunks: 3
        })
    ]
}