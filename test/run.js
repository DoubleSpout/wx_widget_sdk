var Runner = require ("mocha-runner");
new Runner ({
	include: ["blanket"],
    tests: ["./test.v1.js"]
}).run (function (error){
    //It's not the Mocha stderr
    if (error) console.log (error);
});
