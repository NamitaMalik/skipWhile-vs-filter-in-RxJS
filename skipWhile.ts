import { interval, range } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

const numbersBetweenOneAndTwenty = range(1, 20);
const numbersGreaterThanEqualToTen = numbersBetweenOneAndTwenty.pipe(skipWhile(num => num < 10));
numbersGreaterThanEqualToTen.subscribe((number) => {
    console.log(number);
});

const oddNumbersOnly = numbersBetweenOneAndTwenty.pipe(skipWhile(num => num % 2 === 0));
oddNumbersOnly.subscribe((number) => {
    console.log(number);
});

const randomNumbersLessThanEqualToTen = interval(1000).pipe(map((num) => {
    const randomNumber = Math.floor(Math.random() * num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), skipWhile(num => num < 10));

randomNumbersLessThanEqualToTen.subscribe((number) => {
    console.log('Number not skipped', number);
});