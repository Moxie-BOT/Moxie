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
function checkSimilarity(str1, str2) {
    if (str1 === str2) return 1.0

    const len1 = str1.length
    const len2 = str2.length

    const maxDist = ~~(Math.max(len1, len2) / 2) - 1
    let matches = 0

    const hash1 = []
    const hash2 = []

    for (var i = 0; i < len1; i++)
        for (var j = Math.max(0, i - maxDist); j < Math.min(len2, i + maxDist + 1); j++)
            if (str1.charAt(i) === str2.charAt(j) && !hash2[j]) {
                hash1[i] = 1
                hash2[j] = 1
                matches++
                break
            }

    if (!matches) return 0.0

    let t = 0
    let point = 0

    for (var k = 0; k < len1; k++)
        if (hash1[k]) {
            while (!hash2[point])
                point++

            if (str1.charAt(k) !== str2.charAt(point++))
                t++
        }

    t /= 2

    return ((matches / len1) + (matches / len2) + ((matches - t) / matches)) / 3.0
}
function similarityArray(str, array, threshold = 60) {
    return array
        .map(e => { return { e, v: this.checkSimilarity(str, e) } })
        .filter(({ v }) => v >= threshold / 100)
        .reduce((_, curr, i, arr) => arr[i].v > curr ? arr[i].v : curr.e, null)
}
function applyPlaceholders(placeholders, string, delimiters = ['{', '}']) {
    if (!placeholders) return;
    return string.replace(new RegExp(Object.keys(placeholders).map(k => `${delimiters[0]}${k}${delimiters[1]}`).join('|'), 'g'), match => placeholders[match.replace(new RegExp(delimiters.join('|'), 'g'), '')])
}

module.exports = {
    abbreviateNumber,
    timeToMilliseconds,
    convertAbbreviatedNum,
    checkSimilarity,
    similarityArray,
    applyPlaceholders
}