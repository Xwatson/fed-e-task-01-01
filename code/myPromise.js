const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
    status = PENDING // 保存状态，默认pending
    value = undefined // 保存成功转递的值
    reason = undefined // 保存失败传递的值
    successCallBack = [] // 保存成功回调集合
    failCallBack = [] // 保存失败回调集合
    constructor(fn) {
        try {
            // 实例化立即调用，并传入resolve，reject回调
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    _isPending() {
        return this.status === PENDING
    }
    /**
     * 成功回调
     * @param {*} value 成功的值 
     */
    resolve = value => {
        // 如果当前状态不是pending则停止执行
        if (!this._isPending()) return
        // 修改当前状态为fulfilled成功
        this.status = FULFILLED
        // 保存值
        this.value = value
        // 循环依次调用成功回调
        while (this.successCallBack.length) {
            this.successCallBack.shift()()
        }
    }
    /**
     * 失败回调
     * @param {*} reason 失败的值
     */
    reject = reason => {
        // 如果当前状态不是pending停止执行
        if (!this._isPending()) return
        // 修改状态为失败
        this.status = REJECTED
        // 保存失败原因
        this.reason = reason
        // 循环依次调用失败回调
        while (this.failCallBack.length) {
            this.failCallBack.shift()()
        }
    }
    /**
     * then函数
     * @param {*} successCallBack 成功回调
     * @param {*} failCallBack  失败回调
     */
    then(successCallBack, failCallBack) {
        // 如果没有传递成功回调，重新给成功回调复制一个新的函数
        successCallBack = successCallBack ? successCallBack : value => value
        // 如果失败函数未传递，重新给失败回调复制一个新函数并抛出错误
        failCallBack = failCallBack ? failCallBack : reason => { throw reason }
        // 创建新的promise对象
        const promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // 定时器保证能获取到promise2
                setTimeout(() => {
                    try {
                        // 接受成功回调返回值
                        const x = successCallBack(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 接受失败回调返回值
                        const x = failCallBack(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else {
                // 否则等待中
                // 将成功与失败回到保存起来
                successCallBack && this.successCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            // 接受成功回调返回值
                            const x = successCallBack(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                failCallBack && this.failCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            // 接受失败回调返回值
                            const x = failCallBack(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch(failCallBack) {
        // 只注册失败回调
        return this.then(undefined, failCallBack)
    }
    finally(callback) {
        // 无论成功失败都将调用 callback
        return this.then(value => {
            // 将callback回调返回值包裹resolve返回
            return MyPromise.resolve(callback()).then(() => value)
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }
    /**
     * all方法
     * @param {*} array 
     */
    static all(array) {
        // 保存结果
        let result = []
        // 保存当前添加结果个数
        let index = 0
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value
                index++
                if (index === array.length) {
                    // 如果当前index已经等于数组长度了，调用成功
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i]
                if (current instanceof MyPromise) {
                    // 如果是promise对象
                    current.then(value => addData(i, value), reject)
                } else {
                    // 否则是普通值
                    addData(i, current)
                }
            }
        })
    }
    static resolve(value) {
        // 如果当前值是promise对象，直接返回
        if (value instanceof MyPromise) return value
        // 否则返回一个promise对象，返回promise对象
        return new MyPromise((resolve) => resolve(value))
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 处理循环调用问题
    if (promise2 === x) {
        return reject(new TypeError('MyPromise循环调用了'))
    }
    // 如果x是myPromise对象
    if (x instanceof MyPromise) {
        // 交给promise处理回调
        x.then(resolve, reject)
    } else {
        // 否则是普通值
        resolve(x)
    }
}
module.exports = MyPromise