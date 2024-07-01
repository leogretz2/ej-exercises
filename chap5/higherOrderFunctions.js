// Note:
// map is transform each element of an array
// filter is put each element through a test, if pass, keep
// reduce is have a running value, alter it with some value at each index
    // Can keep an element in the array as the running value (max thing)

// Ex.1 - Flattening
const flatten = (arr) => {
    return arr.reduce((current, element) => {
        console.log(current, element)
        // isArray is not a function, but maybe there's an equivalent => Array.isArray(test)
        return current.concat(Array.isArray(element) ? flatten(element): element)
    },[])
}

console.log('1. Flatten:')
console.log(flatten([1,2,[3]]))
console.log(flatten([[4,5,6],[2,3,4],[37,38,39]]))
// console.log([1,2].concat([[3]]))

// Ex.2 - Your Own Loop
const loop = (value, test, update, body) => {
    for(let i = value; test(i);i=update(i)){
        body(i)
    }
}

console.log('2. Own Loop:')
console.log(loop(0,
    (n) => n < 4, 
    (n) => ++n,
    (n)=> console.log(n)))

// Ex.3 - Everything
const everyLoop = (arr, pred) => {
    for(let i of arr){
        if (!pred(i)) return false
    }
    return true
}

const everySome = (arr, pred) => {
    return arr.reduce((current, element) => current && pred(element), true)
}

const everySome2 = (arr, pred) => arr.reduce((current, element) => current && pred(element), true)

console.log('3. Everything')
console.log(everyLoop([1,2,3],(n)=>n < 4))
console.log(everyLoop([1,2,3],(n)=>n < 3))

console.log(everySome([1,2,3],(n)=>n < 4))
console.log(everySome([1,2,3],(n)=>n < 3))

console.log(everySome2([1,2,3],(n)=>n < 4))
console.log(everySome2([1,2,3],(n)=>n < 3))

// Ex.4 - Dominant Writing Direction
// loads SCRIPTS database (array of objects), and functions:
// repeat, characterScript, countBy, textScripts
require("./05_higher_order/code/load")("code/scripts.js", "code/chapter/05_higher_order.js")

const domDirection = text => {
    const directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.direction : "none"
    }).filter(direction => direction != "none")
    if (directions.length == 0) return "ltr";

    // Can 
    return directions.reduce((high, d) => high.count < d.count ? d : high).name;
}

console.log('cS', domDirection("Heylᠤᠨᠦᠨᠡᠨمساءالخير"))