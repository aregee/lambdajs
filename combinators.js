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

// Talk about history of lambda calculus

// Turing <-> LC  https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=105


header('I := λx.x')


// CODE THIS

// header('Idiot := I')

// Prove I I = I



// Introduce LC by [Lambda Talk](https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=14)


// header('Mockingbird := M := ω := λf.ff')

// CODE THIS:

// prove 'M I = I I = I',

// What is M M ?



// Touch Base on Combinators https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=76


// header('Numbers!')

// we can count function calls

// Counting is fun
// header('0 := λfx.x')

// header('1 := λfx.fx')

// header('2 := λfx.f(fx)')


// Talk about [Beta Reduction](https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=48)

// ### Composition and Point-Free Notation

// Point-free (some joke "point-less") notation means to define a function purely as a combination of other functions, without explicitly writing final arguments. Sometimes this style reveals what a function *is* rather than what explain what it *does*. Other times it can be abused to produce incomprehensible gibberish. Successor is a reasonable candidate for it, however.

// We are doing n-fold compositions, so let's define an actual `compose` function to help. Composition is often notated as `∘` in infix position: `(f ∘ g) x = f(g(x))`. However, Lambda Calculus only includes prefix position function application. Smullyan named this the Bluebird after Curry's `B` combinator.

// header('Bluebird := B := (∘) := compose := λfgx.f(gx)')


// Now that we have an actual composition function, we can define successor without mentioning the final `x` value argument.


// header('3 := λfx.f(ffx)')

// header('SUCCESSOR := λnfx.f(nfx)')

const nextn = num => fn => x => fn(num(fn)(x));
// console.log(toNumber(nextn(two)))

// More about combinators https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=94


// header('SUCC := λnf.f∘(nf) = λnf.Bf(nf)')
// CODE THIS: 

// TODO 3, 4, 5

// Arithmetic

// How to Add two numbers ?
// ie: add two numbers n and m, when numbers are call counters ?
// Call the function n times, then call it m more times 
// n ie: f => x => x
// five => // f => x => f(f(f(f(f(x)))))) four
// /header("add := λ n m . λ f x . m (n f x) f ")

var add = n => m => f => x => m(f)(n(f)(x));

// console.log(toNumber(add(two)(four)))

// header('ADD := λab.a(SUCC)b')

// CODE THIS:


// Aha, addition is just the Ath successor of B. Makes sense. For example, `ADD 3 2 = 3 SUCC 2`, which could be read as "thrice successor of twice".
// TODO six and seven

// n * m 
const mul = n => m => z => m(n(z));
// console.log(toNumber(mul(four)(three)))


// header('MULT := λab.a∘b = Bluebird')



// #### Exponentiation

// Exponentiation is remarkably clean too. When we say 2^3, we are saying "multiply two by itself three times"; or putting it another way, "twice of twice of twice". So for any base and power, the result is the power-fold composition of the base:

// header('Thrush := POW := λab.ba')


// QUESTION: What is Answer to everything in Universe ?
// Answer => 2 + (2^3 * (4+1))



// #### The Kestrel

// header('Kestrel combinator and True and False')

// header('T := λxy.x')


// header('F := λxy.y')


// header('Kestrel := K := konst := λk_.k')
// Code This

// ISZERO used a nice trick to produce a constant. We'll abstract that out. This is the Kestrel combinator `K`, named for the German word "Konstante". The `K` combinator takes a value, and produces a function which ignores its input, always returning the original value. So, `K0` is a function that always returns 0; (`K tweet`) is a function which always returns tweet.


// header('IS0 := λn.n(KF)T')

// CODE THIS: 

// `K` should look familiar; it's "alpha-equivalent" to `T`. Alpha-equivalence means it is identical except for variable names, which are arbitrary and don't affect the behavior: `λk_.k = λab.a`.

// #### The Kite

// We can also make `F` out of `K` and `I`. 
// Try tracing through the logic and confirming that `KI = F`. This result is known as the Kite.

// header('         K = T')
// header('Kite := KI = F')
// CODE THIS

// header("Conditonals")

// header("<boolean> ? <then do this> : <else do this>")

const ifThenElse = bool => thn => els => bool(thn)(els)

// List of combinators https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=251

// ### Flipping Arguments

// Another fun way we could have produced F was with the Cardinal combinator. The Cardinal, aka `C`, aka `flip`, takes a binary (two-argument) function, and produces a function with reversed argument order.

// header('Cardinal := C := flip := λfab.fba')
// CODE THIS

// With the Cardinal, we can derive `F` from the flip of `T`:

// header('F = C T')

// Write a program to handle ifElse and select b/w clauses

// header("Logic")

// header('NOT := λb.bFT')


// demo("Not of False Should be True", NOT(Fls))
// demo("Not of True Should be False", NOT(Tru))

// header('AND := λpq.pqp')


// header("Truth Table - AND")


// header('OR := λpq.ppq')

// header("Truth Table - OR")

// header('De Morgan: not (and P Q) = or (not P) (not Q)')

// function deMorgansLawDemo (p, q) { return NOT(AND(p)(q)) === OR(NOT(p))(NOT(q)) }

// demo('NOT (AND F F) = OR (NOT F) (NOT F)', deMorgansLawDemo(F, F))
// demo('NOT (AND T F) = OR (NOT T) (NOT F)', deMorgansLawDemo(T, F))
// demo('NOT (AND F T) = OR (NOT F) (NOT T)', deMorgansLawDemo(F, T))
// demo('NOT (AND T T) = OR (NOT T) (NOT T)', deMorgansLawDemo(T, T))


// DS ?
// header("Data Structures - List")
// - List 
//  - Empty (nil)
//  - One Thing
//  - Multiple Things

// Start from pairs of two things 
// Pairs

// header('Vireo := V := PAIR := λabf.fab')


// header('getLeft := λp.p(T)')



// header('getRight := λp.p(F)')




// List ?
// header("form: (empty?, listContents")
// A list of form : (empty?, listContents)

// const isEmpty = getLeft;

// const nil = Vireo(Tru)(Tru);

// demo("List is Empty", isEmpty(nil))

// Add to List 
// To make a new list, we prepend the item to the old list, making new list:
// (empty?=falz, (newItem, oldList))
// header('prepend := λqp.V(F)(Vqp)')
// non empty list are composed of nested pairs
// [3, 2, 1] -> (empty?=faz, (3,(2,(1,nill))))

// var singleItemList = prepend(one)(nil); // (falz, (1, nill))
// var multiItemList = prepend(three)(prepend(two)(singleItemList)); //(falz, (3,(2,(1,nill))))


// demo("List should not be Empty", NOT(isEmpty(multiItemList)))

// non-empty list has form (empty?=falz, (head, tail));
// header('first := λq.B(λp.pT)(λp.pF)q')
// Code This

// console.log(toNumber(first(multiItemList)))

// header('rest := λq.B(λp.pF)(λp.pF)q')
// Code This


// console.log(toNumber(first((rest(multiItemList)))))



// header('PHI := Φ := λp.PAIR (SND p) (SUCC (SND p))')
// const PHI = oldPair => PAIR(getRight(oldPair))(SUCC(getRight(oldPair)))

// const examplePair0 = V(Fls)(zero) 

// const examplePair4 = V(Fls)(four)

// demo('Φ <False, 0> = <0, 1>',
//   toNumber( getLeft(PHI(examplePair0)) ) === 0 &&
//   toNumber( getRight(PHI(examplePair0)) ) === 1
// )
// demo('Φ <False, 4> = <4, 5>',
//   toNumber( getLeft(PHI(examplePair4)) ) === 4 &&
//   toNumber( getRight(PHI(examplePair4)) ) === 5
// )

// console.log(toNumber(getRight(Φ(examplePair4))))
// console.log(toNumber(getRight(Φ(Φ(examplePair4)))))


// header('PRED := λn.getLeft (n Φ <0, 0>)')
// const PRED = n => getLeft( n(PHI)(PAIR(zero)(zero)))

// demo('PRED 0 = 0', toNumber( PRED(zero) ) === 0)
// demo('PRED 1 = 0', toNumber( PRED(one) ) === 0)
// demo('PRED 2 = 1', toNumber( PRED(two) ) === 1)
// demo('PRED 3 = 2', toNumber( PRED(three) ) === 2)

// header('SUB := λab.b PRED a')
// const SUB = a => b => b(PRED)(a)

// demo('SUB 5 2 = 3', toNumber( SUB(five)(two) ) === 3)
// demo('SUB 4 0 = 4', toNumber( SUB(four)(zero) ) === 4)
// demo('SUB 2 2 = 0', toNumber( SUB(two)(two) ) === 0)
// demo('SUB 2 7 = 0', toNumber( SUB(two)(seven) ) === 0)