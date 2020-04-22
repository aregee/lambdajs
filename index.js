const errs = []
const {red} = require('chalk');
function demo (msg, bool) {
	if (typeof bool === 'function') bool = bool(true)(false);
	if (!!bool !== bool) throw TypeError('second arg must be boolean or positive number (JS or LC)')
	console.log(`${bool ? '✅ ' : '❌ '} ${msg}`)
	if (!bool) errs.push(Error(red(`Spec fail: ${msg} -> ${bool}`)))
}

function logErrsAndSetExitCode () {
	errs.forEach(err => console.error(err))
	if (errs.length && process) process.exitCode = 1
}

function header (str) {
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
