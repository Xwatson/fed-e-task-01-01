// map
function map(array, fn) {
    const result = []
    for (const value of array) {
        result.push(fn(value))
    }
    return result
}
// test
console.log('map:', map([1,2,3], v => v*2)) // 2,4,6

// every
function every(array, fn) {
    for (const value of array) {
        if (!fn(value)) {
            return false
        }
    }
    return true
}
// test
console.log('every:', every([1,4,7], v => v > 8)) // false

// some
function some(array, fn) {
    for (const value of array) {
        if (fn(value)) {
            return true
        }
    }
    return false
}
//test
console.log('some:', some([1,4,7],v => v === 4)) // true