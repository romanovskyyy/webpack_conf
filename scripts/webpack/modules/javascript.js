export const loadJavaScript = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    use:  {
                        loader:  'babel-loader',
                        options: {
                            compact: false,
                        },
                    },
                },
            ],
        },
    };
};
