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

const addNewJokeToList = async () => {
	let jokeText = await axiosGetJoke();
	let jokesList = document.querySelector(".jokesList");
	let newLi = document.createElement("li");
	newLi.append(jokeText);
	jokesList.append(newLi);
};

const axiosGetJoke = async () => {
	try {
		let response = await axios.get("https://icanhazdadjoke.com/", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		return response.data.joke;
	} catch (e) {
		console.log(e);
		return "No jokes available!";
	}
};

const jokeButton = document.querySelector(".jokeButton");
jokeButton.addEventListener("click", addNewJokeToList);

//
//
//
//
//
// Object Oriented & Factory Functions

// function hex(r, g, b) {
// 	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

// function rgb(r, g, b) {
// 	return `rgb(${r}, ${g}, ${b})`;
// }

// function makeColor(r, g, b) {
// 	const color = {};
// 	color.r = r;
// 	color.g = g;
// 	color.b = b;
// 	color.rgb = function () {
// 		const { r, g, b } = this;
// 		return `rgb(${r}, ${g}, ${b})`;
// 	};
// 	color.hex = function () {
// 		const { r, g, b } = this;
// 		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// 	};
// 	return color;
// }

// const firstColor = makeColor(70, 120, 210);

//
//
//
//
//

// Creates a blank, plain JavaScript object;
// Links (sets the constructor of) this object to another object;
// Passes the newly created object from Step 1 as the this context;
// Returns this if the function doesn't return its own object;

function Color(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

Color.prototype.rgb = function () {
	const { r, g, b } = this;
	return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
	const { r, g, b } = this;
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function (a = 1.0) {
	const { r, g, b } = this;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const color1 = new Color(125, 25, 225);
