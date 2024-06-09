// Ex.1 - Min of two numbers
const mini = (a: number,b: number): number => a > b ? b : a

console.log(mini(3,4))

// Ex.2 - Recursion, even/odd
function isEven(num: number) {
    if (num == 0) return true
    if (num == 1) return false
    return isEven(num-2)
}

const isEven2 = (num: number) => num == 0 ? true : num == 1 ? false : isEven(num-2)

console.log('50',isEven(50), isEven2(50), '\n75', isEven(75), isEven2(75))//, '\n-1', isEven(-1), isEven2(-1))

// Ex.3 - Bean Counting
function countBs(input: string): number{
    let count = 0;
    for(let i = 0; i < input.length; i++)
        if(input[i] == 'B')
            count++
    return count
}

function countChar(input: string, choice: string): number{
    let count = 0;
    for(let i = 0; i < input.length; i++)
        if(input[i] == choice)
            count++
    return count
}

console.log(countBs('lkjB'))
console.log(countChar('lkjlB','l'))
