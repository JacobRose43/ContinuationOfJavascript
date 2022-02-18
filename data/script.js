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
//
//
//
//
//

// FETCH API - NEW WAY TO MAKE REQUESTS

fetch("https://icanhazdadjoke.com/", {
	method: "GET",
	headers: {
		Accept: "application/json",
	},
})
	.then((res) => {
		console.log("RESPONSE, WAITING TO PARSE...", res);
		return res.json(); // parsing...
	})
	.then((data) => {
		console.log("DATA PARSED...", data);
		console.log(`\nOur extremly good joke:\n ${data.joke}`);
	})
	.catch((err) => {
		console.log("WE HAVE A PROBLEM HERE! =>", err);
	});

// SAME EXAMPLE WITH ASYC FUNCTION (await)

const getJoke = async () => {
	try {
		const res = await fetch("https://icanhazdadjoke.com/", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		const data = await res.json();
		console.log(data.joke);
	} catch (error) {
		console.log("SOMETHING WENT WRONG!\n\n", error);
	}
};

// remember about try{} and catch{} when using async function!!!!

//
//
//
// AXIOS

// example

axios
	.get("https://icanhazdadjoke.com/", {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	})
	.then((res) => {
		console.log(res.data.joke);
	})
	.catch((error) => {
		console.log("OOPS!\n", error);
	});

// example with async function

const axiosGetJoke = async () => {
	try {
		let response = await axios.get("https://icanhazdadjoke.com/", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		console.log(response.data.joke);
		let jokesList = document.querySelector(".jokesList");
		let newLi = document.createElement("li");
		newLi.append(response.data.joke);
		jokesList.append(newLi);
	} catch (error) {
		console.log("We have a situation here!", error);
	}
};
