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

    plus(v2) {
        return new Vec(this.x+v2.x, this.y+v2.y)
    }

    toString() {
        return `Vec(${this.x}, ${this.y})`;
    }
}

function main(){
    v = new Vec(3,4)
    v2 = new Vec(4,5)
    console.log(v.length)
    console.log(v.plus(v2))
    return 0;
}

main()