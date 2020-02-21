#!/usr/bin/env node

const Heap = require('./heap2');

module.exports = test;

function test() {
    let a = [1, 2, 3, 4, 5, 6, 7],
        heap = new Heap(a.slice(0).reverse());

    a.forEach(e=>assertEqual(e, heap.pop()));

    let b = randFill(new Array(100));
    heap = new Heap();

    b.forEach(e=>heap.push(e));
    while(!heap.isEmpty()) {
        process.stdout.write(heap.pop() + ', ');
    }
    process.stdout.write('\n');

    a = new Heap(shuffle(fill(100)));
    for(let i of a) {
        process.stdout.write(`${i}, `);
    }
}

function assertEqual(a, b, msg) {
    if(a !== b) {
        throw new Error(`${a} !== ${b}. ${msg}`);
    }
}
function randRange(min, max) {
    return ~~(Math.random()*((max+1)-min) + min);
}

function randFill(array) {
    for( var i=0, l=array.length; i<l; array[i++] = randRange(0, l) );
    return array;
}

function shuffle(array) {
    for(let i=0, l=array.length, tmp, r=randRange(0, l-1); i<l; i++, r=randRange(0, l-1)) {
        tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

function fill(l) {
    let a = [];
    for(let i=0; i<l; a.push(i++));
    return a;
}
