// Core
import merge from 'webpack-merge';
import path from "path";

// Instruments
import {BUILD, CHUNK_NAME_JS, SOURCE} from '../constants';
import {
    loadJavaScript,
    loadFonts,
    connectHtml,
    loadImages,
    loadSvg,
    defineEnvVariables,
} from '../modules';

export default () => {
    const { NODE_ENV } = process.env;
    const IS_DEVELOPMENT = NODE_ENV === 'development';

    return merge(
        {
            entry: SOURCE,
            output: {
                path:          BUILD,
                filename:      IS_DEVELOPMENT ? '[name].js' : `js/entry~${CHUNK_NAME_JS}`,
                chunkFilename: IS_DEVELOPMENT
                    ? '[name].js'
                    : `js/chunk~${CHUNK_NAME_JS}`,
                hashDigestLength: 5,
                // Фикс ссылок изобржений из 6-го урока ↓
                // publicPath:       '/',
            },
        },
        connectHtml(),
        loadJavaScript(),
        loadFonts(),
        loadImages(),
        loadSvg(),
        defineEnvVariables({
            __ENV__:  JSON.stringify(NODE_ENV),
            __DEV__:  NODE_ENV === 'development',
            __PROD__: NODE_ENV === 'production',
        }),
    );
};
