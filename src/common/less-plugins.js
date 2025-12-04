/**
 * Разовый размер шрифта, от которого надо строить остальные размеры.
 * @type {number}
 */
const BASE_FONT_SIZE = 15;

/**
 * Плагины с дополнительными функциями для less
 *
 */
module.exports = {
    install(less, pluginManager, functions) {
        functions.add('getBaseFontSize', () => `${BASE_FONT_SIZE}px`);

        functions.add('calcRem', (sizeInPx) => less
            .dimension((sizeInPx.value / BASE_FONT_SIZE).toFixed(5), 'rem'));

        functions.add('calcPercent', (sizeInPx) => less
            .dimension((sizeInPx.value * (100 / BASE_FONT_SIZE)).toFixed(0), '%'));

        functions.add('calcVW', (sizeInPx) => less
            .dimension((sizeInPx.value / 12.8).toFixed(5), 'vw'));
    },
};
