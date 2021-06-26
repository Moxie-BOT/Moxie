const { readdirSync, readFileSync } = require('fs')

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
function applyPlaceholders (string, placeholders, delimiters = ['<<', '>>']) {
  if (!placeholders) return string
  if (!string) return
  try {
    return string.replace(new RegExp(Object.keys(placeholders).map(k => `${delimiters[0]}${k}${delimiters[1]}`).join('|'), 'g'), match => placeholders[match.replace(new RegExp(delimiters.join('|'), 'g'), '')])
  } catch { return string }
}
function getTranslation (topic, placeholders, guild) {
  const file = topic.split(':')[0]
  if (!topic) return
  let lang
  switch (guild.storage.language) {
    case 0:
      lang = 'pt-BR'
      break
    case 1:
      lang = 'en-US'
  }
  const languages = readdirSync(`src/locales/${lang}`).map(l => [l.split('.')[0]])
  if (!languages) return topic

  for (let i = 0; i < languages.length; i++) { languages[i][1] = JSON.parse(readFileSync(`src/locales/${lang}/${languages[i][0]}.json`, { encoding: 'utf8' }).replace(/\s|\r|\n|\t/g, ' ')) }

  const returnPop = languages[languages.findIndex(l => l[0] === file)]
  if (!returnPop) return topic
  return this.applyPlaceholders(topic.split(':')[1].split('.').reduce((obj, curr) => obj?.[curr], returnPop[1]), placeholders)
}

module.exports = {
  abbreviateNumber,
  convertAbbreviatedNum,
  applyPlaceholders,
  getTranslation
}
