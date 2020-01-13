module.exports = class Grid{
    static WALL = 0;
    static EMPTY = 1;
    static START = 2;
    static GOAL = 3;

    constructor(width, height) {
        this.width = Number(width);
        this.height = Number(height);
        this.grid = (new Array(this.width*this.height)).fill(Grid.EMPTY);
        this.start = {x: 0, y: 0};
        this.goal = {x: 0, y: 0};
    }

    get(loc) {
        return this.grid[this.pointToPos(loc)];
    }

    isType(loc, type) {
        return this.get(loc) === type;
    }

    isWall(loc) {
        return this.isType(loc, Grid.WALL);
    }

    isGoal(loc) {
        return this.isType(loc, Grid.GOAL);
    }

    isStart(loc) {
        return this.isType(loc, Grid.START);
    }

    isEmpty(loc) {
        return this.isType(loc, Grid.EMPTY);
    }

    pointToPos(p) {
        return p.x + p.y*this.width;
    }

    setLocationType(loc, type) {
        this.grid[this.pointToPos(loc)] = type;
    }

    addWalls(listOfWalls) {
        for(let wall of listOfWalls) {
            this.setLocationType(wall, Grid.WALL);
        }
    }

    addGoal(loc) {
        this.goal.x = loc.x;
        this.goal.y = loc.y;
        this.setLocationType(loc, Grid.GOAL);
    }

    addStart(loc) {
        this.start.x = loc.x;
        this.start.y = loc.y;
        this.setLocationType(loc, Grid.START);
    }
};
