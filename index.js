const errs = []
const { red } = require('chalk');
function demo(msg, bool) {
	if (typeof bool === 'function') bool = bool(true)(false);
	if (!!bool !== bool) throw TypeError('second arg must be boolean or positive number (JS or LC)')
	console.log(`${bool ? '✅ ' : '❌ '} ${msg}`)
	if (!bool) errs.push(Error(red(`Spec fail: ${msg} -> ${bool}`)))
}

function logErrsAndSetExitCode() {
	errs.forEach(err => console.error(err))
	if (errs.length && process) process.exitCode = 1
}

function header(str) {
	console.log('\n' + str + '\n')
}

var toNumber = n => n(i => i + 1)(0);

// Identity Function
header('λx.x')  // 
let I = x => x;

header('λx.λy.x+y')
let addTwo = x => y => x + y;

header('(λx.λy.x+y) 5 1') // ?

console.log(addTwo(5)(1))

header('Numbers!')
// we can count function calls

// Counting is fun
header('0 := λfx.x')

var zero = f => x => x;

console.log(zero);

header("### Wait... are you sure these are numbers?");

console.log(toNumber(zero));

header('1 := λfx.fx')
var one = f => x => f(x);

console.log(toNumber(one));

header('2 := λfx.f(fx)')
var two = f => x => f(f(x));
console.log(toNumber(two))

header('SUCCESSOR := λnfx.f(nfx)')

header('3 := λfx.f(ffx)')

var nextn = n => f => x => f(n(f)(x));
var three = nextn(two);
console.log(toNumber(three));

header("Arithmetic!")

// How to Add two numbers ?
// ie: add two numbers n and m, when numbers are call counters ?
// Call the function n times, then call it m more times
// n ie: f => x => x
header("add := λ n m . λ f x . m (n f x) f ")

var add = n => m => f => x => m(f)(n(f)(x));

var four = add(two)(two);

console.log(toNumber(four));

var five = nextn(four);

console.log(toNumber(add(four)(five)));

header('multiplication')
// n * m
var mul = n => m => f => x => m(n(f))(x);

var six = mul(three)(two);

console.log(toNumber(six));

header("Booleans and conditonals")

header("<boolean> ? <then do this> : <else do this>");

var ifThenElse = bool => thn => els => bool(thn)(els);
var troo = thn => els => thn;
var falz = thn => els => els;

var tiered = falz;
var coffeesToday = ifThenElse(tiered)(six)(one);

header(`Number of coffeesToday ${toNumber(coffeesToday)}`);

header("Logic")

demo("should be false", (falz))
demo("should be true", (troo))

header('NOT')

var not = bool => thn => els => bool(els)(thn);

demo("Not of False Should be True", not(falz))
demo("Not of True Should be False", not(troo))

header('OR')
var or = A => B => A(A)(B);


header("Truth Table - OR")
demo("True or True", or(troo)(troo))
demo("True or False", or(troo)(falz))
demo("False or False", or(falz)(falz))
demo("False or True", or(falz)(troo))

header('AND')

var and = A => B => A(B)(A);

header("Truth Table - AND")
demo("True and True", and(troo)(troo))
demo("True and False", and(troo)(falz))
demo("False and False", and(falz)(falz))
demo("False and True", and(falz)(troo))


header("Data Structures - List")
//  - Empty (nil)
//  - One Thing
//  - Multiple Things

// Start from pairs of two things
// Pairs
var makePair = left => right => f => f(left)(right); // f(l)(r)

var getLeft = pair => pair(troo)
var getRight = pair => pair(falz)

console.log(toNumber(getRight(makePair(two)(three))))
console.log(toNumber(getLeft(makePair(two)(three))))

// List ?
header("form: (empty?, listContents")
// A list of form : (empty?, listContents)
var isEmpty = getLeft;
var nil = makePair(troo)(troo);
demo("List is Empty", isEmpty(nil))

// Add to List
// To make a new list, we prepend the item to the old list, making new list:
// (empty?=falz, (newItem, oldList))

var prepend = item => list => makePair(falz)(makePair(item)(list));

// non empty list are composed of nested pairs
// [3, 2, 1] -> (empty?=faz, (3,(2,(1,nill))))

var singleItemList = prepend(one)(nil);
// (falz, (1, nill))

var multiItemList = prepend(three)(prepend(two)(singleItemList));
//(falz, (3,(2,(1,nill))))

// Structural Sharing

// non-empty list has form (empty?=falz, (head, tail));

var first = list => getLeft(getRight(list));
var rest = list => getRight(getRight(list));

console.log(toNumber(first((rest(multiItemList)))))

header('FIB := λn.n (λfab.f b (add a b)) bool 0 1')

const FIB = n => n(f => a => b => f(b)(add(a)(b)))(troo)(zero)(one)

demo('FIB 0 = 0', toNumber(FIB(zero)) === 0)
demo('FIB 1 = 1', toNumber(FIB(one)) === 1)
demo('FIB 2 = 1', toNumber(FIB(two)) === 1)
demo('FIB 3 = 2', toNumber(FIB(three)) === 2)
demo('FIB 4 = 3', toNumber(FIB(four)) === 3)
demo('FIB 5 = 5', toNumber(FIB(five)) === 5)
demo('FIB 6 = 8', toNumber(FIB(six)) === 8)