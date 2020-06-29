const fp = require('lodash/fp')
const cars = require('../json/cars.json')

const getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFirstCarName(cars))