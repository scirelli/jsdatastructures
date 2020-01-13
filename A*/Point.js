module.exports = class Point{
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    copy(p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    }
};
