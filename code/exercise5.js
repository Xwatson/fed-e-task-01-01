const fp = require('lodash/fp')
const { Container, Maybe } = require('./support')

// 练习1：
const maybe = Maybe.of([5, 6, 1])
const ex1 = (num) => {
    return maybe.map(fp.map(fp.add(num)))
}
console.log('练习1：', ex1(1))

// 练习2：
const xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
const ex2 = () => {
    return xs.map(fp.first)
}
console.log('练习2：', ex2())

// 练习3：
const safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x])
})
const user = { id: 2, name: 'Albert' }
const ex3 = () => {
    return Container.of(user).map(fp.flowRight(fp.first, fp.prop('_value'), safeProp('name')))
}
console.log('练习3：', ex3())

// 练习4：
const ex4 = (n) => {
    return Maybe.of(n).map(parseInt)._value
}
console.log('练习4：', ex4(null), ex4(1))