import { resolve } from 'path';

export const loadJavaScript = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            compact: false
                        }
                    }
                }
            ]
        }
    };
};
