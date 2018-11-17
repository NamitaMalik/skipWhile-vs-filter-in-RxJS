import { interval, range } from "rxjs";
import { filter, map } from "rxjs/operators";

const numbersLessThanTen = range(1, 20).pipe(filter(num => num < 10));
numbersLessThanTen.subscribe((number) => {
    console.log(number);
});

const randomNumbers = interval(1000).pipe(map((num) => {
    const randomNumber = Math.floor(Math.random() * num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), filter(num => num > 10));
randomNumbers.subscribe((number) => {
    console.log('Number is greater than 10 -->', number);
});