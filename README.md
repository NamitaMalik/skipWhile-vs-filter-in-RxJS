# skipWhile vs filter in RxJS

I was working on a scenario where I had to perform an action only when some other actions were not performed. A real 
life use case could be an auto-logout: don't do anything till user is performing some actions on the application and if 
they stop, start a timer and then logout them from the application.

So basically we need to skip performing our action while certain condition is met and when that condition no longer 
holds true, perform our action. This cycle would repeat. So I was using RxJS to achieve this behavior. I decided to 
use skipWhile operator but did not fit my use case well and I had to use filter operator instead.

There is a basic difference between `skipWhile` and `filter` operator that actually made lot of difference in my 
case. Let's understand the differences.

**skipWhile**

Suppose we have a stream of numbers which has numbers in the range 1-20. We only want to print 
numbers `>= 10`. Here is a small snippet achieving same:

```
const numbersBetweenOneAndTwenty = range(1, 20);
const numbersGreaterThanEqualToTen = numbersBetweenOneAndTwenty.pipe(skipWhile(num => num < 10));
numbersGreaterThanEqualToTen.subscribe((number) => {
    console.log(number);
})
```

o/p

```
10
11
12
13
14
15
16
17
18
19
20
```

Now, let's try to skip even numbers and print even numbers. Here we go:

```
const oddNumbersOnly = numbersBetweenOneAndTwenty.pipe(skipWhile( num => num % 2 === 0));
oddNumbersOnly.subscribe((number) => {
    console.log(number);
});
```

o/p

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
```

Uh..what's that? We have the entire range of numbers printed. But why?

As per the [ReactiveX docs](http://reactivex.io/documentation/operators/skipwhile.html):

> "The SkipWhile subscribes to the source Observable, but ignores its emissions until such time as some condition you 
specify becomes false, at which point SkipWhile begins to mirror the source Observable."

So in simple terms it means skipWhile operator will ignore the emissions until the specified condition becomes false,
but after that it will continue to take values from the source observable as is.

Let's see another snippet before we move to `filter` operator:

```
const randomNumbersLessThanEqualToTen = interval(1000).pipe(map((num) => {
    const randomNumber = Math.floor(Math.random()*num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), skipWhile(num => num < 10));

randomNumbersLessThanEqualToTen.subscribe((number) => {
    console.log('Number not skipped', number);
});
```

o/p:

```
Random Number Generated 0
Random Number Generated 0
Random Number Generated 1
Random Number Generated 1
Random Number Generated 1
Random Number Generated 0
Random Number Generated 3
Random Number Generated 1
Random Number Generated 4
Random Number Generated 3
Random Number Generated 5
Random Number Generated 6
Random Number Generated 0
Random Number Generated 5
Random Number Generated 0
Random Number Generated 5
Random Number Generated 11
Number not skipped 11
Random Number Generated 6
Number not skipped 6
Random Number Generated 12
Number not skipped 12
Random Number Generated 1
Number not skipped 1
Random Number Generated 19
Number not skipped 19 
......
......
......
......
```

If we notice the above output, we can understand that everything was working fine till the random numbers were less 
than 10. As soon as 11 (i.e. num < 10 === false) got generated and emitted all the generated numbers were taken and 
printed.

> Therefore, it means skipWhile drops emissions until condition is met and after that it does not filter anything 
and mirrors the source observable as is.
