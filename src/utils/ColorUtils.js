const Colors = require('colors')

module.exports = class ColorUtils {
  static hexToDecimal (hex) {
    return parseInt(hex.replace('#', ''), 16)
  }

  static resolveColor (color) {
    if (typeof color === 'string') {
      switch (color) {
        case 'RANDOM':
          return Math.floor(Math.random() * (0xffffff + 1))
        case 'DEFAULT':
          return 9456380
        case 'RED':
          return 0xDA3131
        case 'GREEN':
          return 0x7CEE27
      }
      color = Colors[color] || parseInt(color.replace('#', ''), 16)
    } else if (Array.isArray(color)) color = (color[0] << 16) + (color[1] << 8) + color[2]

    if (color < 0 || color > 0xffffff) throw new RangeError('COLOR_RANGE')
    else if (color && isNaN(color)) throw new TypeError('COLOR_CONVERT')

    return color
  }
}
