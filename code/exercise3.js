const fp = require('lodash/fp')
const cars = require('../json/cars.json')

// 帮助函数
const _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
// 原函数
const averageDollarValue = function(cars) {
    const dollar_values = fp.map(function(car) {
        return car.dollar_value
    }, cars)
    console.log(dollar_values)
    return _average(dollar_values)
}
console.log('原函数打印：', averageDollarValue(cars))
// 使用组合函数
const averageDollarValue_FR = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
console.log('组合函数打印：', averageDollarValue_FR(cars))