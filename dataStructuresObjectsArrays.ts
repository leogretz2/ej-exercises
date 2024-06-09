// Sum of a range
// Recreate console.log(sum(range(1,10)))
// No built-in range or sum - lodash or reduce
function myRange(start: number, end: number, step: number = 1): number[]{
    const ret: number[] = []
    for(let i = start; i <= end; i+=step){
        ret.push(i)
    }
    return ret
}

function mySum(arr: number[]): number {
    let total = 0
    for (const num of arr) {
        total += num
    }

    // JS in returns string of boolean value - weird
    // for (const numb in arr) {
    //     console.log(typeof numb, numb)
    //     if (Number(numb)) {
    //         console.log(`yes ${numb}`)
    //     }
    // }
    return total
}
// console.log(myRange(1,800))
console.log(mySum(myRange(1,10,2)))
