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

Suppose we have a stream of numbers which has numbers in the range 1-100. We only want to print 
numbers `>= 10`. Here is a small snippet achieving same:

<script src="https://gist.github.com/NamitaMalik/3a8d2c619629b4ca5819c66de89fc835.js"></script>

