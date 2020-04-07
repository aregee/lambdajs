# JavaScript in a Single Arrow 

## Lambda (𝛌) Calculus,
* Mathematical formalism
* Invented by this hero (Alonzo Church) starting 1932:
![Alonzo Church](https://upload.wikimedia.org/wikipedia/en/a/a6/Alonzo_Church.jpg)
* Universal model of computation (Turing-complete) (NBD)



# What is Lamda Calculus ?

|| ** Lambda function (𝛌) ** | ** Arrow function (`=>`) **
--- | --- |  ---
*used for* | thinking | programming
*inputs*   | 1 | 0+
*outputs*  | 1 | 0+
*side effects?* | no way!  | maybe

---


### If we treat `=>` like 𝛌, **what can we do** with it?


|| ** Lambda function (𝛌) ** | ** Arrow function (`=>`)**
--- | --- |  ---
*making one*<br>*("abstraction")*|  λx.x | `x => x`
 *faking multiple args*          |  λx.λy.x+y | ~~`(x, y) => x + y`~~<br>`x => y => x + y`
*using one*<br>*("application")* | (λx.λy.x+y) 5 1 <br> 5+1 <br> 6 | `(x => y => x + y)(5)(1)`*<br>*`5+1`<br> `6`


---
## Numbers 

*What can we count if all we have are functions?*

> Yes, you can define numbers (and indeed, arbitrary data types) inside the lambda calculus. Here's the idea. -[adding numbers in LC](https://stackoverflow.com/questions/29756732/how-would-the-lambda-calculus-add-numbers)

The simplest numbers to work with are the natural numbers: 0, 1, 2, 3, and so on.

Peano Axioms describes this as follows:
- 0 is a natural number
- if `n` a natural number, then Sn is a natural number.

S denotes the successor of `n` or `n+1`.

First few Peano natural numbers
 > 0, S0, SS0, SSS0, and so on - it's a unary representation.

We can represent function applications in lamda calculus, hence, we can easily represent Sn, however the problem is that we don't know how to represent 0 and S themselves.

> TLDR: We can count **function applications** (calls)!

Let's write `x` for the `0` we're given, and `f` for the `S` we're given. Then we can represent the first few numbers as follows:

- zero `'λfx.x'` => `f => x => x`
- one `'λfx.fx'` => `f => x => f(x)`
- two `'λfx.f(fx)'` => `f => x => f(f(x))`

## Higher Numbers 

Successor function : given a number,get the next number

```js
var nextn = n => f => x => f(n(f)(x));
var four = nextn(three);
var five = nextn(nextn(three));
var six = nextn(nextn(nextn(three)));
var seven = nextn(nextn(nextn(nextn(three))));

```

## Arithmetic

How can we add two numbers `n` and `m`, when numbers are call-counters?

Call the function `n` times, then call it `m` more times!

```js
var add = n => m => f => x => m(f)(n(f)(x));
```

What about multiplying n and m?

```js
var mul = n => m => f => x => m(n(f))(x);

```
---

## Booleans! Conditionals!

`<boolean> ? <then do this> : <else do this>`

```js

var ifThenElse = bool => thn => els => bool(thn)(els);
var troo = thn => els => thn; 
var falz = thn => els => els;
```
---
## Logic
- not `bool => thn => els => bool(els)(thn)`
- or `A => B => A(A)(B)`
- and `A => B => A(B)(A)`

---
## Datastructures
- list
- pairs
- fibbo
---

## Acomplishments

* Data
    * (natural) numbers
    * booleans
* Arithmetic
* Logic & Control flow

Representing data this way is called...

### Church Encoding

---
## Repl.it 

<iframe height="400px" width="100%" src="https://repl.it/@aregee/lamdajs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

---

## There's so much more we could do!


* Subtract, Divide
* Successor, Predecessor
* Predicates (e.g. `isZero`, `isEven`, ...)
* (In)equality
* Strings (as lists of characters represented by their char codes)
* Lists (as nested pairs) & list manipulations (e.g. `map`, `reduce`, `filter`)
* ...y'know, all of computation

---
# Learning Resources

[The Universe in a Single Arrow](https://gist.github.com/vakila/e920ba4d5567ddbb1c0e64f17366c77f)

[Lambda Talk](https://glebec.github.io/lambda-talk/)

[JavScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[More JavaScript](https://dev.to/emmabostian/how-to-learn-javascript-54i6)

[The birth and death of JavaScript](https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript)

[JavaScript at Innovaccer](https://dev.to/aregee/breaking-down-the-last-monolith-micro-frontends-hd4)