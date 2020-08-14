const fs = require('fs')

const readFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

const file1 =  './a.txt'
const file2 =  './b.txt'
const file3 =  './c.txt'


// 使用Promise 方法
console.log('********************使用 Promise 方法********************')
// readFile(file1).then(res => {
//     console.log(res.toString())
//     return readFile(file2)
// }).then(res => {
//     console.log(res.toString())
//     return readFile(file3)

// }).then(res => {
//     console.log(res.toString())
// })
console.log('********************使用 Generator 方法********************')
// 使用 Generator
// function * gen() {
//     yield readFile(file1)
//     yield readFile(file2)
//     yield readFile(file3)
//     return '结束'
// }

// let g = gen()
// g.next().value.then(res => {
//     console.log(res.toString())
//     return g.next().value
// }).then(res => {
//     console.log(res.toString())
//     return g.next().value
// }).then(res => {
//     console.log(res.toString())
// })

console.log('********************使用 async 方法********************')
async function fn() {
    const a1 = await readFile(file1)
    console.log(a1.toString())
    const a2 = await readFile(file2)
    console.log(a2.toString())
    const a3 = await readFile(file3)
    console.log(a3.toString())
}
fn()