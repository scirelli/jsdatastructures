#!/usr/bin/env node
const A_Star = require('./a*');

const grid = new A_Star.Grid(100, 100)
    .addStart({x: 0, y: 0})
    .addGoal({x: 9, y: 9});

/*
 0 1 2 3 4 5 6 7 8 9
 # _ _ _ _ _ _ _ _ _ 0
 _ _ _ _ _ _ _ _ _ _ 1
 _ _ _ _ _ _ _ _ _ _ 2
 _ _ _ _ _ _ _ _ _ _ 3
 _ _ _ _ _ _ _ _ _ _ 4
 _ _ _ _ _ _ _ _ _ _ 5
 _ _ _ _ _ _ _ _ _ _ 6
 _ _ _ _ _ _ _ _ _ _ 7
 _ _ _ _ _ _ _ _ _ _ 8
 _ _ _ _ _ _ _ _ _ H 9
 */
let pathFinder = new A_Star(grid);

console.log(pathFinder.findShortestPath().join(', '));
