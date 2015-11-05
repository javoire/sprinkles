module.exports = function wrap(value, min, rangeSize) {
  rangeSize -= min;
  while (value < min) {
    value += rangeSize;
  }
  return value % rangeSize;
}
