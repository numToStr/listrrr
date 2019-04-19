/**
 * Function for deleting multiple object properties
 *
 * @param {Object} target Object from which properties to be deleted
 * @param {String|Array} keys Object properties to be deleted
 * @param {Boolean} mongooseString Determines whether the keys provided is mongoose select string
 */

const deleteProps = (target, keys, mongooseString = false) => {
    let $keys = keys;

    if (keys) {
        if (mongooseString) {
            const _keys = keys.replace(/-/g, "").split(" ");
            $keys = _keys;
        }

        if (typeof keys === "string") {
            Reflect.deleteProperty(target, $keys);
        } else if (Array.isArray(keys)) {
            $keys.forEach(key => {
                Reflect.deleteProperty(target, key);
            });
        }
    }

    return target;
};

module.exports = {
    deleteProps
};
