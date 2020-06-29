// --------------------------改造一---------------------------
function test1() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            var a = 'hello'
            setTimeout(() => {
                var b = 'lagou'
                setTimeout(() => {
                    var c = 'I ♥ U'
                    resolve(a + b +c)
                }, 10)
            }, 10)
        }, 10)
    })
}
test1().then(function(data) {
    console.log(data)
})

// --------------------------改造二---------------------------
function hello() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve('hello')
        }, 10)
    })
}
function lagou() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve('lagou')
        }, 10)
    })
}
function love() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve('I ♥ U')
        }, 10)
    })
}

Promise.all([hello(), lagou(), love()]).then(function(data) {
    console.log(data[0] + data[1] + data[2])
})