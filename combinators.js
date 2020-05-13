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
var mul = n => m => f => x => m(n(f))(x);

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


