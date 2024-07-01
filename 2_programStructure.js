// #1
for (let i = 1; i <= 7; i++ ) {
    let output = ''
    for (let j = 0; j < i; j++)
        output += '#'
    console.log(output)
}

// #2
// FizzBuzz your ass

// #3
let size = 4, evenRow = false // evenRow starts false because row 1
for (let i = 0; i < 2*size; i++) {
    let row = '#'
    for (let j = 0; j < size-1; j++) {
        row += ' #'
    }
    if (evenRow)
        row += ' '
    else
        row = ' ' + row
    evenRow = !evenRow
    console.log(row)
}