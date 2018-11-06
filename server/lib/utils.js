/**
 * Returns a property access convenient function
 * @param {string} key Key to access
 * @returns {function} Property accessor function
 */
function prop(key) {
  return obj => obj[key];
}

/**
 * Picks the property `key` from each object in the array and returns it as a new array
 * @param {string} key The key to be extracted from every object
 * @param {Object[]} array Array of objects to be picked
 * @returns {any[]} Returns an array of all properties `key` of each object in the input array
 */
function pluck(key, array) {
  return array.map(prop(key));
}

/**
 * Returns the intersection of two or more arrays
 * @param {string} intersectionKey The key that is compared to determine whether
 * two objects are identical
 * @param {Object[][]} arrays An array of two or more arrays to intersect
 * @returns {array} A new array containing only the elements that are present in
 * all given arrays
 */
function intersectOn(intersectionKey, arrays) {
  return arrays.reduce((intersection, nextArray) => {
    const uniquePropertiesOfNextArray = new Set(pluck(intersectionKey, nextArray));
    return intersection.filter(item => uniquePropertiesOfNextArray.has(item[intersectionKey]));
  });
}

/**
 * Returns a new object with key and value pairs being picked from the
 * respective arrays, matched by array index
 * @param {string[]} keys Array of keys
 * @param {any[]} values Array of values
 * @returns {Object} New object containing keys and values matched by index
 */
function zipObject(keys, values) {
  return keys.reduce(
    (result, key, index) => ({
      ...result,
      [key]: values[index]
    }),
    {}
  );
}

exports.prop = prop;
exports.pluck = pluck;
exports.intersectOn = intersectOn;
exports.zipObject = zipObject;
