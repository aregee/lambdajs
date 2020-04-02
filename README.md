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
*using one*<br>*("application")* | (λx.λy.x+y) 5 1<br>> 5+1<br>> 6 | `(x => y => x + y)(5)(1)`*<br>*> `5+1`<br>> `6`


---
## Numbers 

What can we count if all we have are functions?

We can count **function applications** (calls)!

- zero `'λx.x'` => `f => x => x`
- one `'λ(λx.x).x'` => `f => x => f(x)`
- two `'λx.x'` => `f => x => f(f(x))`

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