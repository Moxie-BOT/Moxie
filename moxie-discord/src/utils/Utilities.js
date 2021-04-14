function convertAbbreviatedNum(abbreviation) {
    let abbr = abbreviation.replace(/,/gi, "").replace(/kk/gi, "M")
    const number = parseFloat(abbr.substr(0, abbr.length - 1))
    const unit = abbr.substr(-1).toLowerCase()
    const zeros = { k: 1e3, m: 1e6, g: 1e9, t: 1e12 }

    let parse = parseFloat(abbr)
    if (isNaN(parse)) return parse = undefined
    else if (!zeros[unit]) return parse;

    return !zeros[unit] ? parseFloat(abbreviation) : number * zeros[unit]
}
function timeToMilliseconds(time) {
    const timeUnits = time.replace(/[\d\s]/g, _ => '').toLowerCase().split('')
    const formats = ['d', 'h', 'm', 's']

    const isValid = timeUnits.length === new Set(timeUnits).size && timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u))
    if (!isValid) return null

    const formatted = time.replace(/([a-zA-Z])/g, '$1 ').toLowerCase().trim().split(' ').filter(f => !!f)
    if (formatted.some(e => !/[0-9]/.test(e))) return null

    const invalid = { h: 24, m: 60, s: 60 }
    for (const f of formatted) {
        const value = f.replace(/\D/g, '')
        const unit = f.replace(/\d/gi, '')

        if (value >= invalid[unit]) return null
    }

    const convertions = { d: 86_400_000, h: 3_600_000, m: 60_000, s: 1000 }

    return formatted.reduce((acc, curr, i, a) => acc + parseInt(curr.substring(0, curr.length - 1)) * convertions[curr[curr.length - 1]], 0)
}
function abbreviateNumber(number, precision = 2) {
    const suffsFromZeros = { 0: '', 3: 'k', 6: 'M', 9: 'G', 12: 'T' }
    const { length } = number.toString()
    const lengthThird = length % 3
    const divDigits = length - (lengthThird || lengthThird + 3)
    const calc = '' + (number / Math.pow(10, divDigits)).toFixed(precision)

    return number < 1000 ? '' + number : (calc.indexOf('.') === calc.length - 3 ? calc.replace(/\.00/, '') : calc) + suffsFromZeros[divDigits]
}

module.exports = {
    abbreviateNumber,
    timeToMilliseconds,
    convertAbbreviatedNum
}