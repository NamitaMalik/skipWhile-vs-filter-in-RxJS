# skipWhile vs filter in RxJS

I was working on a scenario where I had to perform an action only when some other actions were not performed. So 
basically we need to skip performing our action while certain condition is met and when that condition no longer 
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

> " The SkipWhile subscribes to the source Observable, but ignores its emissions until such time as some condition you 
specify becomes false, at which point SkipWhile begins to mirror the source Observable. "

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

**filter**

Now let's have a look at the filter operator. IMPO, this operator is a bit boring. It does not hold surprises like 
`skipWhile` operator had.

[ReactiveX Docs](http://reactivex.io/documentation/operators/filter.html) say:

> " The Filter operator filters an Observable by only allowing items through that pass a test that you specify in the 
form of a predicate function. "

Let's see it doing some action:

```
const numbersLessThanTen = range(1,20).pipe(filter(num => num < 10));
numbersLessThanTen.subscribe((number) => {
    console.log(number);
});
```

o/p:

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
```

That is what we expected i.e. it should filter all the numbers less than 10.

Let's see one more example:

```
const randomNumbers = interval(1000).pipe(map((num) => {
    const randomNumber = Math.floor(Math.random() * num);
    console.log('Random Number Generated', randomNumber);
    return randomNumber;
}), filter(num => num > 10));
randomNumbers.subscribe((number) => {
    console.log('Number is greater than 10 -->', number);
});
```


o/p:

```
Random Number Generated 0
Random Number Generated 0
Random Number Generated 1
Random Number Generated 0
Random Number Generated 1
Random Number Generated 4
Random Number Generated 5
Random Number Generated 6
Random Number Generated 0
Random Number Generated 7
Random Number Generated 4
Random Number Generated 9
Random Number Generated 7
Random Number Generated 7
Random Number Generated 11
Number is greater than 10 --> 11
Random Number Generated 13
Number is greater than 10 --> 13
Random Number Generated 13
Number is greater than 10 --> 13
Random Number Generated 3
Random Number Generated 2
Random Number Generated 8
Random Number Generated 8
Random Number Generated 5
Random Number Generated 1
Random Number Generated 22
Number is greater than 10 --> 22
Random Number Generated 12
Number is greater than 10 --> 12
..............
..............
```

So above output simply showcased that filter simply filters the emissions on the basis of condition 
specified and it filters throughout the lifetime of observable.

Well, this blog was to highlight the difference between these two RxJS operators, a difference if ignored 
can lead to unexpected results and head banging!

Happy Learning! Happy Sharing!

Follow Me
---
[Github](https://github.com/NamitaMalik)

[Twitter](https://twitter.com/namita13_04)

[LinkedIn](https://in.linkedin.com/in/namita-malik-a7885b23)

[More Blogs By Me](https://namitamalik.github.io/)