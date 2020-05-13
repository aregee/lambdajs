const chalk = require('chalk')
const green = chalk.green.bind(chalk)
const red = chalk.red.bind(chalk)

const errs = []

function demo (msg, bool) {
	if (typeof bool === 'function') bool = bool(true)(false)
	if (!!bool !== bool) throw TypeError('second arg must be boolean (JS or LC)')
	console.log(`${bool ? green('✔') : red('✖')} ${msg}`)
	if (!bool) errs.push(Error(red(`Spec fail: ${msg} -> ${bool}`)))
}

function logErrsAndSetExitCode () {
	errs.forEach(err => console.error(err))
	if (errs.length) process.exitCode = 1
}

function header (str) {
	console.log('\n' + str + '\n')
}

var toNumber = n => n(i => i + 1)(0);


header('I := λx.x')
const I = x => x
header('Idiot := I')
const Idiot = I
demo('I I = I', I(I) === I)

header('Mockingbird := M := ω := λf.ff')

const ω = fn => fn(fn)
const M = ω
const Mockingbird = M
demo('M I = I I = I', M(I) === I(I) && I(I) === I)
try {
  M(M)
} catch (err) {
  demo('M M = M M = M M = ' + err.message, true)
}

header('Numbers!')
// we can count function calls

// Counting is fun
header('0 := λfx.x')
const zero = f => x => x;
console.log(zero);
header("### Wait... are you sure these are numbers?")
console.log(toNumber(zero))
header('1 := λfx.fx')
const one = f => x => f(x);
console.log(toNumber(one))
header('2 := λfx.f(fx)')
const two = f => x => f(f(x));
console.log(toNumber(two))

// ### Composition and Point-Free Notation

// Point-free (some joke "point-less") notation means to define a function purely as a combination of other functions, without explicitly writing final arguments. Sometimes this style reveals what a function *is* rather than what explain what it *does*. Other times it can be abused to produce incomprehensible gibberish. Successor is a reasonable candidate for it, however.

// We are doing n-fold compositions, so let's define an actual `compose` function to help. Composition is often notated as `∘` in infix position: `(f ∘ g) x = f(g(x))`. However, Lambda Calculus only includes prefix position function application. Smullyan named this the Bluebird after Curry's `B` combinator.

header('Bluebird := B := (∘) := compose := λfgx.f(gx)')
const compose = f => g => x => f(g(x))
const B = compose
const Bluebird = B

// Now that we have an actual composition function, we can define successor without mentioning the final `x` value argument.


header('3 := λfx.f(ffx)')

header('SUCC := λnf.f∘(nf) = λnf.Bf(nf)')
const SUCC = num => fn => B( fn )( num(fn) )
const three = SUCC(two);
console.log(toNumber(three));

const four = SUCC(SUCC(SUCC(SUCC(zero))))
const five = SUCC(four)


// Arithmetic

// How to Add two numbers ?
// ie: add two numbers n and m, when numbers are call counters ?
// Call the function n times, then call it m more times 
// n ie: f => x => x
// five => // f => x => f(f(f(f(f(x)))))) four
header("add := λ n m . λ f x . m (n f x) f ")

// var add = n => m => f => x => m(f)(n(f)(x));

header('ADD := λab.a(succ)b')
const ADD = numA => numB => numA(SUCC)(numB)

// Aha, addition is just the Ath successor of B. Makes sense. For example, `ADD 3 2 = 3 SUCC 2`, which could be read as "thrice successor of twice".

const six = ADD(five)(one)
const seven = five(SUCC)(two)

console.log(toNumber(six))
console.log(toNumber(seven))

// n * m 
const mul = n => m => f => x => m(n(f))(x);

const eight = mul(four)(two);

console.log(toNumber(eight))

header('MULT := λab.a∘b = Bluebird')
const MULT = Bluebird

const nine = MULT(three)(three);

console.log(toNumber(nine))


// #### Exponentiation

// Exponentiation is remarkably clean too. When we say 2^3, we are saying "multiply two by itself three times"; or putting it another way, "twice of twice of twice". So for any base and power, the result is the power-fold composition of the base:

header('Thrush := POW := λab.ba')
const POW = numA => numB => numB(numA)

// 2 + (2^3 * (4+1))
const answer = ADD(two)(MULT(POW(two)(three))(ADD(four)(one)))

console.log(toNumber(answer))



// #### The Kestrel

header('Kestrel combinator and True and False')

header('T := λxy.x')
const T = thn => els => thn

header('F := λxy.y')
const F = thn => els => els


header('Kestrel := K := konst := λk_.k')
// ISZERO used a nice trick to produce a constant. We'll abstract that out. This is the Kestrel combinator `K`, named for the German word "Konstante". The `K` combinator takes a value, and produces a function which ignores its input, always returning the original value. So, `K0` is a function that always returns 0; (`K tweet`) is a function which always returns tweet.
const konst = k => _ => k
const K = konst
const Kestrel = K


header('IS0 := λn.n(KF)T')
const IS0 = num => num(K(F))(T)

demo('IS0 0 = T', IS0(zero) === T)
demo('IS0 1 = F', IS0(one) === F)
demo('IS0 2 = F', IS0(two) === F)

// `K` should look familiar; it's "alpha-equivalent" to `T`. Alpha-equivalence means it is identical except for variable names, which are arbitrary and don't affect the behavior: `λk_.k = λab.a`.

// #### The Kite

// We can also make `F` out of `K` and `I`. Try tracing through the logic and confirming that `KI = F`. This result is known as the Kite.

header('         K = T')
header('Kite := KI = F')
const Tru = K
const Fls = K(I)
const Kite = Fls

header("Booleans and conditonals")

header("<boolean> ? <then do this> : <else do this>")

const ifThenElse = bool => thn => els => bool(thn)(els);
const tiered = Fls;
const coffeesToday = ifThenElse(tiered)(six)(one);

header(`Number of coffeesToday ${toNumber(coffeesToday)}`);

// ### Flipping Arguments

// Another fun way we could have produced F was with the Cardinal combinator. The Cardinal, aka `C`, aka `flip`, takes a binary (two-argument) function, and produces a function with reversed argument order.

header('Cardinal := C := flip := λfab.fba')
const flip = func => a => b => func(b)(a)
const C = flip
const Cardinal = C

// With the Cardinal, we can derive `F` from the flip of `T`:

header('F = C T')

const isUpset = C(Fls);
const beersToday = ifThenElse(isUpset)(six)(one);
header(`Number of Beers Today ${toNumber(beersToday)}`);



header("Logic")

// var toBoolean = bool => bool(true)(false)

demo("should be false",(C(Tru)))
demo("should be true",(C(Fls)))

// var not = bool => thn => els => bool(els)(thn);

header('NOT := λb.bFT')
const NOT = bool => bool(Fls)(Tru)


demo("Not of False Should be True", NOT(Fls))
demo("Not of True Should be False", NOT(Tru))

header('AND := λpq.pqF')

const AND = p => q => p(q)(p)

header("Truth Table - AND")
demo("True and True", AND(Tru)(Tru))
demo("True and False",AND(Tru)(Fls))
demo("False and False",AND(Fls)(Fls))
demo("False and True", AND(Fls)(Tru))

const OR = p => q => p(p)(q)

header("Truth Table - OR")
demo("True OR True", OR(Tru)(Tru))
demo("True OR False",OR(Tru)(Fls))
demo("False OR False",OR(Fls)(Fls))
demo("False OR True", OR(Fls)(Tru))

header('De Morgan: not (and P Q) = or (not P) (not Q)')

function deMorgansLawDemo (p, q) { return NOT(AND(p)(q)) === OR(NOT(p))(NOT(q)) }

demo('NOT (AND F F) = OR (NOT F) (NOT F)', deMorgansLawDemo(F, F))
demo('NOT (AND T F) = OR (NOT T) (NOT F)', deMorgansLawDemo(T, F))
demo('NOT (AND F T) = OR (NOT F) (NOT T)', deMorgansLawDemo(F, T))
demo('NOT (AND T T) = OR (NOT T) (NOT T)', deMorgansLawDemo(T, T))


// DS ?
header("Data Structures - List")
// - List 
//  - Empty (nil)
//  - One Thing
//  - Multiple Things

// Start from pairs of two things 
// Pairs

header('Vireo := V := PAIR := λabf.fab')
const PAIR = a => b => f => f(a)(b)
const V = PAIR
const Vireo = V

// var makePair = left => right => f => f(left)(right); // f(l)(r)

var getLeft = pair => pair(Tru)
var getRight = pair => pair(Fls)

console.log(toNumber(getRight(Vireo(two)(three))))
console.log(toNumber(getLeft(Vireo(two)(three))))

// List ?
header("form: (empty?, listContents")
// A list of form : (empty?, listContents)
var isEmpty = getLeft;
var nil = Vireo(Tru)(Tru);

demo("List is Empty", isEmpty(nil))

// Add to List 
// To make a new list, we prepend the item to the old list, making new list:
// (empty?=falz, (newItem, oldList))

var prepend = item => list => V(Fls)(V(item)(list));
// non empty list are composed of nested pairs
// [3, 2, 1] -> (empty?=faz, (3,(2,(1,nill))))

var singleItemList = prepend(one)(nil); // (falz, (1, nill))
var multiItemList = prepend(three)(prepend(two)(singleItemList)); //(falz, (3,(2,(1,nill))))


demo("List should not be Empty", NOT(isEmpty(multiItemList)))

// non-empty list has form (empty?=falz, (head, tail));

var first = list => getLeft(getRight(list));
var rest = list => getRight(getRight(list));

console.log(toNumber(first((rest(multiItemList)))))

header('PHI := Φ := λp.PAIR (SND p) (SUCC (SND p))')
const Φ = oldPair => PAIR(getRight(oldPair))(SUCC(getRight(oldPair)))
const PHI = Φ

const examplePair0 = V(Fls)(zero) 
//list prepend(one)(prepend(zero)(nil))
const examplePair4 = V(Fls)(four)
//list //prepend(five)(prepend(four)(nil))

demo('Φ <chirp, 0> = <0, 1>',
  toNumber( getLeft(Φ(examplePair0)) ) === 0 &&
  toNumber( getRight(Φ(examplePair0)) ) === 1
)
demo('Φ <tweet, 4> = <4, 5>',
  toNumber( getLeft(Φ(examplePair4)) ) === 4 &&
  toNumber( getRight(Φ(examplePair4)) ) === 5
)

console.log(toNumber(getRight(Φ(examplePair4))))
console.log(toNumber(getRight(Φ(Φ(examplePair4)))))


header('PRED := λn.getLeft (n Φ <0, 0>)')
const PRED = n => getLeft( n(Φ)(PAIR(zero)(zero)))

demo('PRED 0 = 0', toNumber( PRED(zero) ) === 0)
demo('PRED 1 = 0', toNumber( PRED(one) ) === 0)
demo('PRED 2 = 1', toNumber( PRED(two) ) === 1)
demo('PRED 3 = 2', toNumber( PRED(three) ) === 2)

header('SUB := λab.b PRED a')
const SUB = a => b => b(PRED)(a)

demo('SUB 5 2 = 3', toNumber( SUB(five)(two) ) === 3)
demo('SUB 4 0 = 4', toNumber( SUB(four)(zero) ) === 4)
demo('SUB 2 2 = 0', toNumber( SUB(two)(two) ) === 0)
demo('SUB 2 7 = 0', toNumber( SUB(two)(seven) ) === 0)