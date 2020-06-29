const fp = require('lodash/fp')
const cars = require('../json/cars.json')

const _underscore = fp.replace(/\W+/g, '_')

// 直接全转换大小写
const sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)))

console.log(sanitizeNames(['Hello World']))