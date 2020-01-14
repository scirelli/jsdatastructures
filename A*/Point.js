module.exports = class Point{
    constructor(x=0, y=0) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    set x(x) {
        this._x = x;
    }
    set y(y) {
        this._y = y;
    }

    equal(p) {
        return this.x === p.x && this.y === p.y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    copy(p) {
        this.x = p.x || 0;
        this.y = p.y || 0;
        return this;
    }
};
