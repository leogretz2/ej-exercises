// @ts-nocheck

// Ex.1 - Sum of a range
// Recreate console.log(sum(range(1,10)))
// No built-in range or sum - lodash or reduce
// Ex.1a,c - Range, given start/end, add step
function myRange(start: number, end: number, step: number = 1): number[]{
    const ret: number[] = []
    let add = start
    for(let i = 0; i <= Math.abs(end-start); i+=1){
        ret.push(add)
        add+=step
    }
    return ret
}

// Ex.1b - Sum of a array
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

// Ex.2 - Reversing an Array
// Ex.2a - Reversing an array in a new array
function reverseArray(arr) {
    const retArr = [];
    for (let i = 0; i < arr.length; i++)
        // @ts-ignore
        retArr.push(arr[arr.length-1-i])
    return retArr
}
console.log('rev', reverseArray([1,2,3]))

// Ex.2b - Reversing an array in place
function reverseArrayInPlace(arr) {
    for (let i = 0; i < arr.length/2; i++) {
        const first = arr[i]
        const second = arr[arr.length - 1- i]
        arr[i] = second
        arr[arr.length -1- i] = first
    }
    return arr
}

console.log('revIP', reverseArrayInPlace([1,2,3]))

// TS:
function reverseArrayTS(arr: Array<any>): Array<any> {
    const retArr: Array<any> = [];
    for (let i = 0; i < arr.length; i++)
        retArr.push(arr[arr.length-1-i])
    return retArr
}
console.log('rev', reverseArray([1,2,3]))

// Ex.2b - Reversing an array in place
function reverseArrayInPlaceTS(arr: Array<any>): Array<any> {
    for (let i = 0; i < arr.length/2; i++) {
        const first = arr[i]
        const second = arr[arr.length - 1- i]
        arr[i] = second
        arr[arr.length -1- i] = first
    }
    return arr
}
console.log('revIP', reverseArrayInPlace([1,2,3]))


// Exercise 3 - List
// Exercise 3.a - Convert array to list
const arrayToList = (arr) => {
    let ret;
    if (arr.length > 0){
        ret = {}
        ret.value = arr[0]
        ret.rest = arrayToList(arr.slice(1,))
    }else {
        return null
    }
    return ret
}

// Exercise 3.b - Convert list to array
const listToArray = (li) => {
  const arr = []
  if (li?.value) {
    arr.push(li.value)
    arr.push(...listToArray(li.rest))
  }
  return arr
}

// Exercise 3.c - Add element to beginning of list
const prepend = (el, li) => ({
  value: el,
  rest: li
})

// Exercise 3.d - Get nth element of list
const nth = (li, n) => {
  if (!li) {
    return undefined
  }else if (n==0){
    return li.value
  } else {
    return nth(li.rest, --n)
  }
}

// Exercise 4 - Deep comparison
const deepEqual = (o1,o2) => {
    if (o1 == null && o2 == null) return true
    let keys = Object.keys(o1)
    let eq = true
    for(key of keys) {
      // First since typeof null == 'object'
      if(!(o1[key] == null) ^ !(o2[key] == null))
        return false
      if(!(typeof o1[key] == 'object') ^ !(typeof o2[key] == 'object')) {
        return false
      } else if(typeof o1[key] == 'object' && typeof o2[key] == 'object') {
        eq = deepEqual(o1[key],o2[key])
      } else {
        eq = (o1[key] === o2[key])
      }
    }
    return eq
  }

  // Solution
  function deepEqualSol(a, b) {
    // Handles two nulls, different addresses w/ same values, and non-objects
    if (a === b) return true;
    
    // If one is null or an object (cool way of doing xor because same already handled)
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;
  
    let keysA = Object.keys(a), keysB = Object.keys(b);
  
    // Different keys (the "optimization")
    if (keysA.length != keysB.length) return false;
  
    // If difference keys or the values are ojects so recursive call
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
  
    return true;
  }