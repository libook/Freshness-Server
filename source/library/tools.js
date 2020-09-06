'use strict';

/**
 * Get type name.
 * @param {*} thing
 * @returns {String}
 */
exports.typeOf = function (thing) {
    if (arguments.length === 0) {
        throw new Error(`There should be one parameter.`);
    }

    return Object.prototype.toString.call(thing)// The value of a string is '[object String]'.
        .replace(/^\[object ([^\]]+)]$/, '$1');
};

{
    const COUNT_LARGEST_DECIMAL = 2 ** (3 * 8) - 1;// 3 byte, start from 0.
    let idCount = Math.floor(Math.random() * COUNT_LARGEST_DECIMAL);
    const TIMESTAMP_LARGEST_DECIMAL = 2 ** (4 * 8) - 1;// 4 byte, start from 0.
    const RANDOM_LARGEST_DECIMAL = 2 ** (5 * 8);// 5 byte, start from 1.
    exports.createId = () => {
        const timestampString = (Math.floor(Date.now() / 1000) % TIMESTAMP_LARGEST_DECIMAL).toString(16).padStart(8, '0');
        const randomString = Math.floor(Math.random() * RANDOM_LARGEST_DECIMAL).toString(16).padStart(10, '0');
        const countString = (idCount = (++idCount) % COUNT_LARGEST_DECIMAL).toString(16).padStart(6, '0');
        return timestampString + randomString + countString;
    };
}
