const fp = require('lodash/fp')
const cars = require('../json/cars.json')
// horsepower 马力，dollar_value 价格，in_stock 库存

// 原函数
const isLastInStock = function(cars) {
    const last_car = fp.last(cars)
    return fp.prop('in_stock', last_car)
}
console.log('原函数打印：', isLastInStock(cars))

// 使用fp.flowRight()
const isLastInStock_FR = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('flowRight打印：', isLastInStock_FR(cars))
