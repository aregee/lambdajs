const errs = []

function demo (msg, bool) {
	if (typeof bool === 'function') bool = bool(true)(false)
	if (!!bool !== bool) throw TypeError('second arg must be boolean (JS or LC)')
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

header('λx.x') // Identity Function
// x => x
header('λx.λy.x+y')
// x => y => x + y
header('(λx.λy.x+y) 5 1')
// (x => y => x + y)(5)(1)

header('NUMBERS!')
// Counting is fun
header('0 := λfx.x')
var zero = f => x => x; 
header('1 := λfx.fx')
var one = f => x => f(x);
header('2 := λfx.f(fx)')
var two = f => x => f(f(x));
header('SUCCESSOR')

header('SUCCESSOR := λnfx.f(nfx)')

header('3 := λfx.f(ffx)')
var nextn = n => f => x => f(n(f)(x));
var three = nextn(two);

header("### Wait... are you sure these are numbers?")

var toNumber = n => n(i => i + 1)(0);

console.log(toNumber(zero))
console.log(toNumber(two))
console.log(toNumber(three))

// aka Church numerals 

// Arithmetic! 

var add = n => m => f => x => m(f)(n(f)(x));

var four = add(one)(three);

console.log(toNumber(four));

var five = add(one)(four);
var eight = add(four)(four);

console.log(toNumber(five));
console.log(toNumber(eight));


//  Multiplying n and m ?

// call n times, m times over!
 var mul = n => m => f => x => m(n(f))(x);

 var six = mul(two)(three);

 console.log(toNumber(six));
 console.log(toNumber(mul(two)(four)));
 console.log(toNumber(mul(three)(five)));
 console.log(toNumber(mul(six)(five)));
 console.log(toNumber(mul(three)(four)));


 var answer = add(two)(mul(four)(mul(two)(add(four)(one))));
 console.log(toNumber(answer));

 // Sytanx 
 // Boolean 
 // Conditonals  
 header("Booleans! Conditionals!")
 
 header("<boolean> ? <then do this> : <else do this>")

 var ifThenElse = bool => thn => els => bool(thn)(els);
 var troo = thn => els => thn; 
 var falz = thn => els => els;

 var tired = troo;
 var coffeesToday = ifThenElse(tired)(six)(two);
 console.log(toNumber(coffeesToday));


 // Logic !

 var toBoolean = bool => bool(true)(false);
 console.log(toBoolean(falz))
 console.log(toBoolean(troo))

 var not = bool => thn => els => bool(els)(thn);
 console.log(toBoolean(not(falz)))

 var or = A => B => A(A)(B);

header("Truth Table - OR")
 console.log(toBoolean(or(troo)(troo)))
 console.log(toBoolean(or(troo)(falz)))
 console.log(toBoolean(or(falz)(falz)))
 console.log(toBoolean(or(falz)(troo)))


 var and = A => B => A(B)(A);
 header("Truth Table - AND")
 console.log(toBoolean(and(troo)(troo)))
 console.log(toBoolean(and(troo)(falz)))
 console.log(toBoolean(and(falz)(falz)))
 console.log(toBoolean(and(falz)(troo)))


 // DS ?

 // - List 
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
// A list of form : (empty?, listContents)
var isEmpty = getLeft;
var nil = makePair(troo)(troo);

console.log(toBoolean(isEmpty(nil)))

// Add to List 
// To make a new list, we prepend the item to the old list, making new list:
// (empty?=falz, (newItem, oldList))

var prepend = item => list => makePair(falz)(makePair(item)(list));
// non empty list are composed of nested pairs
// [3, 2, 1] -> (empty?=faz, (3,(2,(1,nill))))

var singleItemList = prepend(one)(nil); // (falz, (1, nill))
var multiItemList = prepend(three)(prepend(two)(singleItemList)); //(falz, (3,(2,(1,nill))))

// non-empty list has form (empty?=falz, (head, tail));

var first = list => getLeft(getRight(list));
var rest = list => getRight(getRight(list));

console.log(toNumber(first((rest(multiItemList)))))


header('FIB := λn.n (λfab.f b (ADD a b)) K 0 1')

const FIB = n => n(f => a => b => f(b)(add(a)(b)))(troo)(zero)(one)

demo('FIB 0 = 0', toNumber( FIB(zero) ) === 0)
demo('FIB 1 = 1', toNumber( FIB(one) ) === 1)
demo('FIB 2 = 1', toNumber( FIB(two) ) === 1)
demo('FIB 3 = 2', toNumber( FIB(three) ) === 2)
demo('FIB 4 = 3', toNumber( FIB(four) ) === 3)
demo('FIB 5 = 5', toNumber( FIB(five) ) === 5)
demo('FIB 6 = 8', toNumber( FIB(six) ) === 8)
