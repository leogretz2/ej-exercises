// Ex. 1 - Vector Type
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
        new Vec(this.x+v2.x, this.y+v2.y);
    }

    minus(v2){ 
        return new Vec(this.x-v2.x, this.y-v2.y);
    }

    toString() {
        return `VEec(${this.x}, ${this.y})`;
    }
}

class Group {
    guys = {};

    add(x) {
        if (!this.has(x))
            guys = guys + [x];
        return x;
    }

    has(x){
        if (this.guys[x])
        for (const i in this.guys) {
            if (i === x)
                return true
        }
        return false;
    }


}

function main(){
    v = new Vec(3,4)
    v2 = new Vec(4,5)
    console.log(v.length)
    console.log(v.plus(v2))
    console.log(v.minus(v2))
    console.log(new Vec(1, 2).plus(new Vec(2, 3))); // → Vec{x: 3, y: 5}
    console.log(new Vec(1, 2).minus(new Vec(2, 3))); // → Vec{x: -1, y: -1}
    console.log(new Vec(3, 4).length);
}

main()