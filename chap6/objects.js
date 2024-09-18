// Ex. 1 - A Vector Type
class Vec {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    get length() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }

    plus(v2){
        return new Vec(this.x+v2.x, this.y+v2.y);
    }

    minus(v2){ 
        return new Vec(this.x-v2.x, this.y-v2.y);
    }

    toString() {
        return `VEec(${this.x}, ${this.y})`;
    }
}

// Ex. 2 - Groups
class Group {
    constructor() {
        this.guys = {};
    }

    add(x) {
        if (!this.has(x)) {
            this.guys[x] = true;
        }
        return false
    }

    has(x){
        return !!(this.guys[x])
    }

    delete(x) {
        if(this.has(x)){
            delete this.guys[x]
            return `${x} deleted`
        } else {
            return `${x} not present`
        }
    }

    static from(iter) {
        let g = new Group()
        for (const i of iter) {
            g.add(i)
        }
        // for (const i in iter) {
        //     g.add(iter[i])
        // }
        return g
    }

    toString() {
        return Object.keys(this.guys).join(', ')
    }

    // Ex. 3 - GroupIterator
    [Symbol.iterator]() {
        let keys = Object.keys(this.guys)
        let index = 0;

        return {
            next: () => {
                if (index >= keys.length) {
                    return {done: true}
                } else {
                    return {value: keys[index++], done: false}
                }
                let value = this.guys[keys[index]]
                index++
                return {value, done: false}
            }
        }
      };
}

function main(){
    // Vector
    let v = new Vec(3,4)
    let v2 = new Vec(4,5)
    console.log(v.length)
    console.log(v.plus(v2))
    console.log(v.minus(v2))
    console.log(new Vec(1, 2).plus(new Vec(2, 3))); // → Vec{x: 3, y: 5}
    console.log(new Vec(1, 2).minus(new Vec(2, 3))); // → Vec{x: -1, y: -1}
    console.log(new Vec(3, 4).length);

    // Group
    g = new Group()
    g.add(4)
    g.add(6)
    g.add(8)
    g.add(10)
    console.log('ff',g)
    console.log(g.delete(7))
    console.log(g.delete(4))
    console.log('fg',g)
    console.log(g.has(6))
    console.log('fg',g.toString())
    console.log('-----------------')
    
    let group = Group.from([10, 20]);
    console.log(group.has(10)); // → true
    console.log(group.has(30)); // → false
    group.add(10);
    group.delete(10);
    console.log(group.has(10)); // → false
    console.log('-----------------')
    
    // Testing Group
    group = Group.from([10, 20, 30]);
    console.log(group.has(10)); // true
    console.log(group.has(40)); // false
    group.add(40);
    console.log(group.toString()); // "10, 20, 30, 40"
    group.delete(20);
    console.log(group.toString()); // "10, 30, 40"
    
    // Testing Group iteration
    for (let value of group) {
        console.log(value);  // Iterates through "10", "30", "40"
    }
    console.log('-----------------')
    
    for (let i of Group.from(['a','b','c'])) {
        console.log(i)
    }
}

main()