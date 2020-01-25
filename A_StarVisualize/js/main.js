/*global A_Star*/
/*eslint-disable no-console*/
(()=> {
    /*eslint-disable no-unused-vars*/
    const SVG_NAME_SPACE = 'http://www.w3.org/2000/svg',
        BORDER_THICKNESS = 1,
        BLACK            = 'rgb(0,0,0)',
        WHITE            = 'rgb(255,255,255)',
        GRAY             = 'rgb(128,128,128)',
        YELLOW           = 'rgb(247,255,0)', //'rgb(255,255,0)',
        RED              = 'rgb(255,0,0)',
        GREEN            = 'rgb(0,255,0)',
        MAGENTA          = 'rgb(255,0,255)',
        COLOR_WALL       = BLACK,
        COLOR_HALL       = WHITE,
        COLOR_PATH       = GRAY,
        COLOR_GOAL       = YELLOW,
        COLOR_START      = YELLOW,
        COLOR_BORDER     = BLACK,
        COLOR_BAD_PATH   = MAGENTA,
        COLOR_FOUND      = RED,
        SPEED            = 50,
        FONT_SIZE        = 35,
        BLINK_INTERVAL   = 500,
        REMOVE_FOUND_DELAY = 1500;

    const oReq = new XMLHttpRequest(),

        startBtn = document.querySelector('#start'),
        stopBtn = document.querySelector('#stop'),
        fasterBtn = document.querySelector('#faster'),
        slowerBtn = document.querySelector('#slower'),
        output = document.querySelector('#output'),

        svg = document.querySelector('svg'),
        svgWidth = svg.getAttributeNS(null, 'width'),
        svgHeight = svg.getAttributeNS(null, 'height');

    let speed = SPEED,
        shader = shadeGenerator(),
        shouldContinue = false,
        blinkingRooms = [],
        controlRooms = [],
        pathFinder;
    /*eslint-enable no-unused-vars*/

    oReq.addEventListener('load', function reqListener() {
        let boardObj = parseStringBoard(this.response.toString());

        const grid = new A_Star.Grid(boardObj.width, boardObj.height)
            .addWalls(boardObj.listOfWalls)
            .addStart(boardObj.start)
            .addGoal(boardObj.end);

        pathFinder = new A_Star(grid);
        pathFinder.on(A_Star.WALK_COMPLETE, (path)=> {
            console.debug(path.join(', '));
            let removeFound = drawMsg('FOUND!');
            setTimeout(removeFound, 1500);
            drawShortestPath(path);
        });
        pathFinder.on(A_Star.BUILDER_START_NOT_FOUND, ()=> {
            console.debug('aaaahhh');
            let removeFound = drawMsg('Oh No!');
            setTimeout(removeFound, 10000);
        });
        pathFinder.on(A_Star.BUILDER_CUR_CELL, (c)=> {
            console.debug(c);
            colorAPoint(c, shader.next().value);
        });

        drawBoard(grid, svgWidth, svgHeight);
        initUI();

    });
    oReq.open('GET', 'input.txt');
    oReq.send();


    function drawBoard(grid, svgWidth, svgHeight) {
        var colCount = grid.getWidth(),
            rowCount = grid.getHeight(),
            cellWidth = Math.ceil(svgWidth/colCount),
            cellHeight = Math.ceil(svgHeight/rowCount),
            controlRooms = [],
            boardPiece;

        for(let y=0; y<rowCount; y++) {
            for(let x=0, rect; x<colCount; x++) {
                rect = document.createElementNS(SVG_NAME_SPACE, 'rect');
                boardPiece = grid.get({x: x, y: y});

                if(boardPiece === A_Star.Grid.WALL) {
                    rect.style.fill = COLOR_WALL;
                }else if(boardPiece === A_Star.Grid.START || boardPiece === A_Star.Grid.GOAL) {
                    rect.style.fill = COLOR_GOAL;
                    controlRooms.push({x: x, y: y});
                }else {
                    rect.style.fill = COLOR_HALL;
                }

                rect.style.strokeWidth = BORDER_THICKNESS;
                rect.style.stroke = COLOR_BORDER;
                rect.setAttributeNS(null, 'x', x*cellWidth);
                rect.setAttributeNS(null, 'y', y*cellHeight);
                rect.setAttributeNS(null, 'width', cellWidth);
                rect.setAttributeNS(null, 'height', cellHeight);
                svg.appendChild(rect);
            }
        }
    }

    function initUI() {
        output.textContent = '';

        startBtn.addEventListener('click', ()=> {
            shouldContinue = true;
            start();
            startBtn.disabled = true;
        });
        stopBtn.addEventListener('click', stop);
        fasterBtn.addEventListener('click', ()=> {
            speed -= 50;

            if( speed <= 0 ) {
                fasterBtn.disabled = true;
            }

            speed = speed < 0 ? 0 : speed;
            log('Speed: ' + speed);
        });
        slowerBtn.addEventListener('click', ()=> {
            speed += 50;
            fasterBtn.disabled = false;
            log('Speed: ' + speed);
        });

        startBtn.disabled = false;
        stopBtn.disabled = false;

        blinkCell(pathFinder.getGrid().getStart());
        blinkCell(pathFinder.getGrid().getGoal());
    }

    function parseStringBoard(boardStr) {
        const WALL = '#',
            SPACE = '.', //eslint-disable-line no-unused-vars
            START = '0',
            GOAL = '7';

        let board = boardStr.split('\n'),
            boardObj = {
                width:       board[0].length,
                height:      board.length,
                listOfWalls: [],
                start:       {x: 0, y: 0},
                end:         {x: 9, y: 9}
            };

        for(let y in board) {
            for(let x in board[y]) {
                let c = board[y][x];
                if(c === WALL) {
                    boardObj.listOfWalls.push({x: x, y: y});
                }else if(c === START) {
                    boardObj.start = {x: x, y: y};
                }else if(c === GOAL) {
                    boardObj.end = {x: x, y: y};
                }
            }
        }

        return boardObj;
    }

    function start() {
        if(shouldContinue && pathFinder.tick()) {
            setTimeout(start, speed);
        }
    }

    function stop() {
        shouldContinue = false;
        startBtn.disabled = false;
    }

    function drawShortestPath(path, color = MAGENTA) {
        let index = 0;

        draw();

        function draw() {
            if(index < path.length) {
                colorAPoint(path[index++], color);
                setTimeout(draw, speed);
            }
        }
    }

    function blinkCell(cell, color=GREEN) {
        addBlinkingRoom(blinkPoint(cell, color));
    }

    function addBlinkingRoom(room) {
        blinkingRooms.push(room);
    }

    function stopBlinkingRooms() { //eslint-disable-line no-unused-vars
        let room;
        while(room = blinkingRooms.pop()) { //eslint-disable-line no-cond-assign
            room();
        }
    }

    function blinkPoint(point, onColor, delay, offColor) {
        var timeoutId = 0;

        _blinkPoint(point, onColor, delay, offColor);

        return function cancel() {
            clearTimeout(timeoutId);
            colorAPoint(point, offColor);
        };

        function _blinkPoint(point, onColor, delay=BLINK_INTERVAL, offColor=COLOR_HALL) {
            colorAPoint(point, onColor);
            timeoutId = setTimeout(function() {
                blinkPoint(point, offColor, delay, onColor);
            }, delay);
        }
    }

    function colorAPoint(point, color) {
        var rect = svg.children[xyToPos(point.x, point.y)];

        rect.style.fill = color;

        return rect;
    }

    function xyToPos(x, y) {
        return (y * pathFinder.getGrid().getWidth()) + x;
    }

    Math.randRange = function(min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    };

    function *shadeGenerator() {
        var shade = 0, color;

        while(true) {
            color = shade++ % 136 + 64;
            yield `rgb(${color}, ${color}, ${color})`;
        }
    }

    function drawMsg(msg = '') {
        var text = document.createElementNS(SVG_NAME_SPACE, 'text'),
            rect = document.createElementNS(SVG_NAME_SPACE, 'rect'),
            svgRect;

        text.textContent = msg;
        text.setAttributeNS(null, 'font-family', 'Verdana');
        text.setAttributeNS(null, 'font-size', FONT_SIZE + 'px');
        text.setAttributeNS(null, 'stroke', '#00FF00');
        text.setAttributeNS(null, 'fill', '#FFFFFF');
        text.setAttributeNS(null, 'x', (svgWidth/2) - 50);
        text.setAttributeNS(null, 'y', svgHeight/2);
        svg.appendChild(text);

        svgRect = text.getBBox();
        rect.setAttributeNS(null, 'x', svgRect.x-5);
        rect.setAttributeNS(null, 'y', svgRect.y-5);
        rect.setAttributeNS(null, 'width', svgRect.width + 10);
        rect.setAttributeNS(null, 'height', svgRect.height + 10);
        rect.setAttributeNS(null, 'fill', BLACK);

        svg.insertBefore(rect, text);

        return function remove() {
            rect.remove();
            text.remove();
        };
    }

    function log(str) {
        console.debug(str);
        output.textContent = str + '\n' + output.textContent;
    }
})();
