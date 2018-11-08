// Core
import merge from 'webpack-merge';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

// Instruments
import { SOURCE, HOST, PORT } from '../constants';
import getCommonConfig from './webpack.common';
import { connectHotModuleReplacement, loadDevCss } from '../modules';

export default () => {

    return merge(
        getCommonConfig(),
        {
            mode:  'development',
            entry: [
                'webpack-hot-middleware/client?reload=true&quiet=true',
                SOURCE,
            ],
            devtool: 'cheap-module-eval-source-map',
        },
        connectHotModuleReplacement(),
        loadDevCss(),
    );
};
