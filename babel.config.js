module.exports = function babelConfig(api) {
    api.cache(true);

    const presets = [
        ['@babel/preset-env', {
            targets: {
                firefox: '60',
                chrome: '60',
                node: 'current',
            },
        }],
    ];

    return { presets };
};
