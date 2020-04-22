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