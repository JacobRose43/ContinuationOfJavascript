// API XHR's - BAD WAY, all use newer, better versions of that old xmlhttp requests

// but example of that:

// const req = new XMLHttpRequest();

// req.onload = function () {
// 	console.log("All done with request!");
// 	console.log(this);
// };

// req.error = function () {
// 	console.log("Error!");
// 	console.log(this);
// };

// req.open("GET", "https://icanhazdadjoke.com/");
// req.send();

// FETCH API - NEW WAY TO MAKE REQUESTS

fetch("https://icanhazdadjoke.com/")
	.then((res) => {
		console.log("RESPONSE =>", res);
	})
	.catch((err) => {
		console.log("WE HAVE A PROBLEM HERE! =>", err);
	});
