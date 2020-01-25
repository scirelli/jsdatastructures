/*global Point, Grid, AEventPublisher*/
((window, Point, Grid, Publisher)=> {
    const NOT_CHECKED = -1,
        FAILURE = false,
        COMPLETE = true,
        FAILURE_STEP = ()=>FAILURE,
        COMPLETE_STEP = ()=>COMPLETE;

    const BUILDER_CUR_CELL = 'builder.curCell',
        BUILDER_FOUND_START = 'builder.foundStart',
        BUILDER_ADD_ADJ = 'builder.addAdjecentCells',
        BUILDER_START_NOT_FOUND = 'builder.startNotFound',
        WALK_PATH = 'walk.walkPath',
        WALK_COMPLETE = 'walk.walkComplete';

    class A_Star extends Publisher{
        constructor(grid) {
            super();
            this.grid = null;
            this.setGrid(grid);
            this.stepFnc = buildWeightCellList;
            this.buildWeightCellListState = {
                queue: [],
                i:     0,
                init:  function(cell) {
                    this.queue = [(new A_Star.WeightedPoint()).copy(cell)];
                    this.i = 0;
                },
                isQueueEmpty: function() {
                    return this.queue.length === 0;
                },
                haveNotReachedEndOfQueue: function() {
                    return this.i < this.queue.length;
                },
                increment: function() {
                    return ++this.i;
                },
                getCurCell: function() {
                    return this.queue[this.i];
                },
                addCells: function(cells) {
                    this.queue.push(...cells);
                }
            };
            this.walkShortestPathState = {
                weightGrid: null,
                path:       [],
                curCell:    null,
                init:       function(weightGrid) {
                    this.weightGrid = weightGrid;
                    this.curCell = weightGrid.start;
                    this.path = [new Point().copy(this.curCell)];
                },
                foundGoal: function() {
                    return this.curCell.equal(this.weightGrid.goal);
                }
            };
        }

        setGrid(g) {
            if(g instanceof Grid) {
                this.grid = g;
            }else{
                throw new Error('setGrid() parameter one must be of type Grid.');
            }
            return this;
        }

        getGrid() {
            return this.grid;
        }

        tick() {
            let next = this.stepFnc.call(this);
            return next !== FAILURE && next !== COMPLETE;
        }
    }

    function buildWeightCellList() {
        let state = this.buildWeightCellListState,
            curCell;

        if(state.isQueueEmpty()) {
            state.init(this.grid.goal);
        }

        if(state.haveNotReachedEndOfQueue()) {
            curCell = state.getCurCell();
            this.fire(BUILDER_CUR_CELL, curCell);

            if(this.grid.isStart(curCell)) {
                buildWeightedGrid.call(this);
                this.stepFnc = walkShortestPath;
                this.fire(BUILDER_FOUND_START, curCell);
                return;
            }

            this.stepFnc = lookAtAdjecentCells;
        }else{
            this.stepFnc = startNotFound;
        }
    }

    function lookAtAdjecentCells() {
        let state = this.buildWeightCellListState,
            curCell = state.getCurCell(),
            adjecentCells;

        adjecentCells = getAdjecentCellsList.call(this, curCell).filter((cell)=> {
            if(this.grid.isWall(cell)) {
                return false;
            }
            for(let qdCell of state.queue) {
                if(qdCell.equal(cell) && qdCell.weight <= cell.weight) {
                    return false;
                }
            }

            return true;
        });

        state.addCells(adjecentCells);
        state.increment();

        this.stepFnc = buildWeightCellList;

        this.fire(BUILDER_ADD_ADJ, adjecentCells);
    }

    function startNotFound() {
        this.fire(BUILDER_START_NOT_FOUND);
        this.stepFnc = FAILURE_STEP;
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

    function buildWeightedGrid() {
        let weightedCells = this.buildWeightCellListState.queue,
            weightGrid = new Grid(this.grid.width, this.grid.height, NOT_CHECKED);

        weightGrid.start = (new Point()).copy(this.grid.start);
        weightGrid.goal = (new Point()).copy(this.grid.goal);
        weightedCells.forEach((cell)=> {
            weightGrid.setLocationType(cell, cell.weight);
        });

        this.walkShortestPathState.init(weightGrid);
    }

    function walkShortestPath() {
        let state = this.walkShortestPathState,
            weightGrid = state.weightGrid,
            adjCells, lowestWeight;

        if(!state.foundGoal()) {
            adjCells = getAdjecentCellsList.call(this, state.curCell).filter(c=>weightGrid.get(c)!==NOT_CHECKED);
            lowestWeight = adjCells.pop();
            adjCells.forEach((c)=>{
                if(weightGrid.get(c) < weightGrid.get(lowestWeight)) lowestWeight = c;
            });
            state.curCell = lowestWeight;
            state.path.push(new Point().copy(state.curCell));
            this.fire(WALK_PATH, state.curCell);
        }else{
            this.stepFnc = COMPLETE_STEP;
            this.fire(WALK_COMPLETE, state.path);
        }
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

    A_Star.BUILDER_CUR_CELL = BUILDER_CUR_CELL;
    A_Star.BUILDER_FOUND_START = BUILDER_FOUND_START;
    A_Star.BUILDER_ADD_ADJ = BUILDER_ADD_ADJ;
    A_Star.BUILDER_START_NOT_FOUND = BUILDER_START_NOT_FOUND;
    A_Star.WALK_PATH = WALK_PATH;
    A_Star.WALK_COMPLETE = WALK_COMPLETE;

    window.A_Star = A_Star;
})(window, Point, Grid, AEventPublisher);
