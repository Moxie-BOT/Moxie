function convertAbbreviatedNum (abbreviation) {
  const abbr = abbreviation.replace(/,/gi, '').replace(/kk/gi, 'M')
  const number = parseFloat(abbr.substr(0, abbr.length - 1))
  const unit = abbr.substr(-1).toLowerCase()
  const zeros = { k: 1e3, m: 1e6, g: 1e9, t: 1e12 }

  const parse = parseFloat(abbr)
  if (isNaN(parse)) return
  else if (!zeros[unit]) return parse

  return !zeros[unit] ? parseFloat(abbreviation) : number * zeros[unit]
}
function abbreviateNumber (number, precision = 2) {
  const suffsFromZeros = { 0: '', 3: 'k', 6: 'M', 9: 'G', 12: 'T' }
  const { length } = number.toString()
  const lengthThird = length % 3
  const divDigits = length - (lengthThird || lengthThird + 3)
  const calc = '' + (number / Math.pow(10, divDigits)).toFixed(precision)

  return number < 1000 ? '' + number : (calc.indexOf('.') === calc.length - 3 ? calc.replace(/\.00/, '') : calc) + suffsFromZeros[divDigits]
}
function applyPlaceholders (placeholders, string, delimiters = ['<<', '>>']) {
  if (!placeholders) return
  return string.replace(new RegExp(Object.keys(placeholders).map(k => `${delimiters[0]}${k}${delimiters[1]}`).join('|'), 'g'), match => placeholders[match.replace(new RegExp(delimiters.join('|'), 'g'), '')])
}

module.exports = {
  abbreviateNumber,
  convertAbbreviatedNum,
  applyPlaceholders
}
