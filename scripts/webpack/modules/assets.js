// Core
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Instruments
import { STATIC, CHUNK_NAME_ASSET } from '../constants';

export const loadImages = () => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {
                            // input: резовл webpack'a — инфа о файлах, о путях...
                            name: `images/${CHUNK_NAME_ASSET}`,
                            // output: ↑
                        },
                    },
                ],
            },
        ],
    },
});

export const loadSvg = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                issuer: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                            svgo: {
                                plugins: [{ removeTitle: false }],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            },
           
            {
                test:   /\.svg$/,
                issuer: {
                    // тот, кто заимпортил .svg
                    test: /\.css$/,
                },
                use: [
                    {
                        loader:  'file-loader',
                        options: {
                            name: `images/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
        ],
    },
});

export const loadFonts = () => ({
    module: {
        rules: [
            {
                test: /\.(woff2|eot|ttf|woff)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {
                            name: `fonts/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
        ],
    },
});

export const connectHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            title:    'Learn Webpack',
            template: `${STATIC}/template.html`,
            favicon:  `${STATIC}/favicon.ico`,
        }),
    ],
});
