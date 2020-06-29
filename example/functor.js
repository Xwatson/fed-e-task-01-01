class Container {
    // 涵子内部需要有一个值，通过构造传入
    constructor(value) {
        // 将值保存到内部变量，由涵子内部维护
        this._value = value
    }
    // 接受一个处理值的函数
    map(fn) {
        // 返回一个新的涵子
        return new Container(fn(this._value))
    }
}
// 调用涵子
let res = new Container(2)
    .map(x => x + 1) // 处理x + 1，返回一个新的涵子对象，由下一步继续处理 
    .map(x => x * x) // 此时x 既是 x + 1 的结果
console.log(res) // 打印涵子对象 Container { _value: 9 }

// 继续改在，避免看到new Container的语法
class Container1 {
    // 创建一个of静态方法，返回实例化的涵子对象
    static of(value) {
        return new Container1(value)
    }
    // 涵子内部需要有一个值，通过构造传入
    constructor(value) {
        // 将值保存到内部变量，由涵子内部维护
        this._value = value
    }
    // 接受一个处理值的函数
    map(fn) {
        // 改造成直接调用静态方法
        return Container1.of(fn(this._value))
    }
}
// 调用涵子
let res1 = Container1.of(2)
    .map(x => x + 1) // 处理x + 1，返回一个新的涵子对象，由下一步继续处理 （链式编程）
    .map(x => x * x) // 此时x 既是 x + 1 的结果
console.log(res1) // 打印涵子对象 Container1 { _value: 9 }