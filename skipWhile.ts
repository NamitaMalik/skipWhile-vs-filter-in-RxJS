import {range} from 'rxjs';
import {skipWhile} from 'rxjs/operators';

const numbersBetweenOneAndHundred = range(1, 100);
const numbersGreaterThanEqualToTen = numbersBetweenOneAndHundred.pipe(skipWhile(num => num < 10));
numbersGreaterThanEqualToTen.subscribe((number) => {
    console.log(number);
});