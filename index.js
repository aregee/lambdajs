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

// Identity Function
header('λx.x')  // x => x

header('λx.λy.x+y') // x => y => x + y;

header('(λx.λy.x+y) 5 1') // ?

// demo("Answer", )
// console.log(foo(5)(1))
