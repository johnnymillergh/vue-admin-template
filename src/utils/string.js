const StringUtil = {}

/**
 * Check if type of a variable is string.
 * @param {string} targetString target string
 * @return {boolean} true - string; false - not string
 */
StringUtil.isString = function (targetString) {
  return typeof targetString === 'string'
}

/**
 * Check if type of a variable is string.
 * @param {string} targetString target string
 * @return {boolean} true - not string; false - string
 */
StringUtil.isNotString = function (targetString) {
  return typeof targetString !== 'string'
}

/**
 * Check if a string is empty.
 * @param {string} targetString target string
 * @return {boolean} true - empty; false - not empty
 */
StringUtil.isEmpty = function (targetString) {
  if (StringUtil.isNotString(targetString)) {
    return true
  }
  return targetString.trim().length === 0
}

/**
 * Check if a string is not empty.
 * @param {string} targetString target string
 * @return {boolean} true - not empty; false - empty
 */
StringUtil.isNotEmpty = function (targetString) {
  if (StringUtil.isString(targetString)) {
    return targetString.trim().length !== 0
  }
  return false
}

/**
 * Check if length of a string is between min length and max length.
 * @param {string} targetString target string
 * @param {number} minLength min length
 * @param {number} maxLength max length
 * @return {boolean} true - length of a string is between min length and max length
 */
StringUtil.isLengthBetween = function (targetString, minLength, maxLength) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof minLength !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  if (typeof maxLength !== 'number') {
    throw new Error('Type of argument maxLength expected number, but got ' + typeof minLength)
  }
  return minLength <= targetString.length && targetString.length <= maxLength
}

Object.freeze(StringUtil)
export default StringUtil
