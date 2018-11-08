module.exports = api => {
    api.cache.never();

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: "entry",
                    debug: false,
                    spec: true,
                    loose: false,
                    modules: 'commonjs', // default
                },
            ],
        ],
    };
};
