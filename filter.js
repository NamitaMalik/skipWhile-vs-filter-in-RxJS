"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var numbersLessThanTen = rxjs_1.range(1, 20).pipe(operators_1.filter(function (num) { return num < 10; }));
numbersLessThanTen.subscribe(function (number) {
    console.log(number);
});
var randomNumbers = rxjs_1.interval(1000).pipe(operators_1.map(function (num) {
    var randomNumber = Math.floor(Math.random() * num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), operators_1.filter(function (num) { return num > 10; }));
randomNumbers.subscribe(function (number) {
    console.log('Number is greater than 10 -->', number);
});
