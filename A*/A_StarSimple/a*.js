const Point = require('../utils/Point'),
    Grid = require('./Grid');

const NOT_CHECKED = -1;

class A_Star{
    constructor(grid) {
        this.grid = null;
        this.setGrid(grid);
    }

    setGrid(g) {
        if(g instanceof Grid) {
            this.grid = g;
        }else{
            throw new Error('setGrid() parameter one must be of type Grid.');
        }
        return this;
    }

    findShortestPath(grid) {
        grid = grid || this.grid;
        let weightedCells = buildWeightCellList.call(this, grid),
            weightGrid = new Grid(grid.width, grid.height, NOT_CHECKED);

        weightGrid.start = (new Point()).copy(grid.start);
        weightGrid.goal = (new Point()).copy(grid.goal);
        weightedCells.forEach((cell)=> {
            weightGrid.setLocationType(cell, cell.weight);
        });

        return walkShortestPath.call(this, weightGrid);
    }
}

function buildWeightCellList(grid) {
    let queue = [(new A_Star.WeightedPoint()).copy(grid.goal)], i = 0, curCell;

    while(i < queue.length) {
        curCell = queue[i];
        if(this.grid.isStart(curCell)) {
            break;
        }
        queue.push(...getAdjecentCellsList.call(this, curCell).filter((cell)=> {
            if(this.grid.isWall(cell)) {
                return false;
            }
            for(let qdCell of queue) {
                if(qdCell.equal(cell) && qdCell.weight <= cell.weight) {
                    return false;
                }
            }

            return true;
        }));
        i++;
    }
    return queue;
}

function getAdjecentCellsList(cell) {
    let above = new A_Star.WeightedPoint(cell.x, cell.y - 1, cell.weight + 1),
        below = new A_Star.WeightedPoint(cell.x, cell.y + 1, cell.weight + 1),
        left = new A_Star.WeightedPoint(cell.x - 1, cell.y, cell.weight + 1),
        right= new A_Star.WeightedPoint(cell.x + 1, cell.y, cell.weight + 1),
        cellList = [];

    if(this.grid.isValidCell(above)) {
        cellList.push(above);
    }
    if(this.grid.isValidCell(below)) {
        cellList.push(below);
    }
    if(this.grid.isValidCell(left)) {
        cellList.push(left);
    }
    if(this.grid.isValidCell(right)) {
        cellList.push(right);
    }

    return cellList;
}

function walkShortestPath(weightGrid) {
    let curCell = weightGrid.start, path=[new Point().copy(weightGrid.start)], adjCells, lowestWeight;

    while(!curCell.equal(weightGrid.goal)) {
        adjCells = getAdjecentCellsList.call(this, curCell).filter(c=>weightGrid.get(c)!==NOT_CHECKED);
        lowestWeight = adjCells.pop();
        adjCells.forEach((c)=>{
            if(weightGrid.get(c) < weightGrid.get(lowestWeight)) lowestWeight = c;
        });
        curCell = lowestWeight;
        path.push(new Point().copy(curCell));
    }

    return path;
}

A_Star.Grid = Grid;
A_Star.WeightedPoint = class WeightedPoint{
    constructor(x, y, weight = 0) {
        this.point = new Point(x, y);
        this.weight = weight;
    }

    get x() {
        return this.point.x;
    }
    get y() {
        return this.point.y;
    }
    get weight() {
        return this._weight;
    }

    set x(x) {
        this.point.x = x;
    }
    set y(y) {
        this.point.y = y;
    }
    set weight(w) {
        this._weight = w;
    }

    equal(p) {
        return this.point.equal(p);
    }

    toString() {
        return this.point.toString();
    }

    clone() {
        return new WeightedPoint(this.x, this.y, this.weight);
    }

    copy(p) {
        this.x = p.x || 0;
        this.y = p.y || 0;
        this.weight = p.weight || 0;

        return this;
    }
};

module.exports = A_Star;
