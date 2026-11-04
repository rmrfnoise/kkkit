export function isValidString(param) {
    return typeof param === 'string' && param !== ''
}


export function isBase64(param) {
    return isValidString(param) && /^[A-Za-z0-9+/]+={0,2}$/.test(param) && param.length % 4 === 0
}


export function isIdCard(param) {
    return isValidString(param) && /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(param)
}


export function isHexColor(param) {
    return isValidString(param) && /^#(?:[0-9A-F]{3}|[0-9A-F]{6})$/i.test(param)
}


export function isTimestamp(param) {
    return isValidString(param) && /^\d{10}(\d{3})?$/.test(param)
}