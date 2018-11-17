"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var numbersBetweenOneAndTwenty = rxjs_1.range(1, 20);
var numbersGreaterThanEqualToTen = numbersBetweenOneAndTwenty.pipe(operators_1.skipWhile(function (num) { return num < 10; }));
numbersGreaterThanEqualToTen.subscribe(function (number) {
    console.log(number);
});
var oddNumbersOnly = numbersBetweenOneAndTwenty.pipe(operators_1.skipWhile(function (num) { return num % 2 === 0; }));
oddNumbersOnly.subscribe(function (number) {
    console.log(number);
});
var randomNumbersLessThanEqualToTen = rxjs_1.interval(1000).pipe(operators_1.map(function (num) {
    var randomNumber = Math.floor(Math.random() * num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), operators_1.skipWhile(function (num) { return num < 10; }));
randomNumbersLessThanEqualToTen.subscribe(function (number) {
    console.log('Number not skipped', number);
});
