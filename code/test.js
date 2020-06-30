const MyPromise = require('./myPromise')
const { reject } = require('lodash')

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功')
        reject('失败')
    }, 2000)
    // resolve('成功')
    // reject('失败')
})
promise.then(success => {
    console.log(success)
    return 'aqw'
})
.then(res => {
    console.log(res)
    return 2
}, reason => console.log('rrr---', reason))
.then(res => {
    console.log(res)
})

function p1() {
    return new MyPromise((resolve) => {
        setTimeout(() => {
            resolve('p1')
        }, 1000);
    })
}
function p2() {
    return new MyPromise((resolve, reject) => {
        // resolve('p2')
        reject('p2')
    })
}
/* MyPromise.all(['aa', 'bb', p1(), p2(), 'cc']).then(result => {
    console.log('all:', result)
})
MyPromise.resolve(10).then(res => {
    console.log('resolve1:', res)
})
MyPromise.resolve(p2()).then(res => {
    console.log('resolve2:', res)
})
p2().finally(() => {
    console.log('finally')
    return p1()
}).then(res => {
    console.log('finally:', res)
}, reason => console.log(reason))
 */
p2().then(res => {
    console.log('catch-成功: ', res)
}).catch(reason => {
    console.log('catch-失败:', reason)
})