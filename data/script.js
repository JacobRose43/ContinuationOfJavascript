// API XHR's - BAD WAY, all use newer, better versions of that old xmlhttp requests

// but example of that:

// let req = new XMLHttpRequest();

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

let getJoke = async () => {
	try {
		let res = await fetch("https://icanhazdadjoke.com/", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		let data = await res.json();
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

let addNewJokeToList = async () => {
	let jokeText = await axiosGetJoke();
	let jokesList = document.querySelector(".jokesList");
	let newLi = document.createElement("li");
	newLi.append(jokeText);
	jokesList.append(newLi);
};

let axiosGetJoke = async () => {
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

let jokeButton = document.querySelector(".jokeButton");
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
// 	let color = {};
// 	color.r = r;
// 	color.g = g;
// 	color.b = b;
// 	color.rgb = function () {
// 		let { r, g, b } = this;
// 		return `rgb(${r}, ${g}, ${b})`;
// 	};
// 	color.hex = function () {
// 		let { r, g, b } = this;
// 		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// 	};
// 	return color;
// }

// let firstColor = makeColor(70, 120, 210);

//
//
//
//
//

// Creates a blank, plain JavaScript object;
// Links (sets the constructor of) this object to another object;
// Passes the newly created object from Step 1 as the this context;
// Returns this if the function doesn't return its own object;

// function Color(r, g, b) {
// 	this.r = r;
// 	this.g = g;
// 	this.b = b;
// }

// Color.prototype.rgb = function () {
// 	let { r, g, b } = this;
// 	return `rgb(${r}, ${g}, ${b})`;
// };

// Color.prototype.hex = function () {
// 	let { r, g, b } = this;
// 	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// };

// Color.prototype.rgba = function (a = 1.0) {
// 	let { r, g, b } = this;
// 	return `rgba(${r}, ${g}, ${b}, ${a})`;
// };

// let color1 = new Color(125, 25, 225);

class Color {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.calcHSL();
	}
	innerRGB() {
		let { r, g, b } = this;
		return `${r}, ${g}, ${b}`;
	}
	rgb() {
		return `rgb(${this.innerRGB()})`;
	}
	rgba(a = 1.0) {
		return `rgba(${this.innerRGB()}, ${a})`;
	}
	hex() {
		let { r, g, b } = this;
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	hsl() {
		let { h, s, l } = this;
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
	fullySaturated() {
		let { h, l } = this;
		return `hsl(${h}, 100%, ${l}%)`;
	}

	// fullyBright() {
	// 	let { h, s } = this;
	// 	return `hsl(${h}, ${s}%, 100%)`;
	// }
	// only for practise, because lightness 100% = always white :OOO

	opposite() {
		let { h, s, l } = this;
		let newHue = (h + 180) % 360;
		return `hsl(${newHue}, ${s}%, ${l}%)`;
	}
	calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// Calculate hue
		// No difference
		if (delta == 0) h = 0;
		// Red is max
		else if (cmax == r) h = ((g - b) / delta) % 6;
		// Green is max
		else if (cmax == g) h = (b - r) / delta + 2;
		// Blue is max
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		this.h = h;
		this.s = s;
		this.l = l;
	}
}

let color1 = new Color(125, 25, 225);
let color2 = new Color(225, 25, 125);
