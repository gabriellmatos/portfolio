const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fecth random user and add money
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
}

// Double money
function doubleMoney() {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});

	updateDOM();
}

// Sort user
function sortUser() {
	data.sort((a, b) => b.money - a.money);
	updateDOM();
}

// Filter millionares
function filterMillionaires() {
	data = data.filter((item) => item.money > 1000000);
	updateDOM();
}

// Calculate wealth
function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0);

	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
}

// Add new object to data array
function addData(object) {
	data.push(object);
	updateDOM();
}

// Update DOM with default value of data[]
function updateDOM(providedData = data) {
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	providedData.forEach((item) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}

// Format number as money
function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUser);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
