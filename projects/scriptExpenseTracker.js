const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const indicator = document.getElementById('indicator');
const debit = document.getElementById('debit');
const credit = document.getElementById('credit');

// const dummyTransactions = [
// 	{ id: 1, text: 'Flower', amount: -20 },
// 	{ id: 2, text: 'Salary', amount: 300 },
// 	{ id: 3, text: 'Book', amount: -10 },
// 	{ id: 4, text: 'Camera', amount: 150 },
// ];

// JSON.parse used because the content will be stringfied and we want to parse it into an array.
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// Use Local Storage, otherwise just set the array to empty.
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction to array
function addTransaction(e) {
	e.preventDefault();

	if (text.value.trim() === '' || amount.value.trim() === '' || Math.sign(amount.value) === -1) {
		alert('Por favor, adicione uma descrição e um valor válido.');
	} else {
		const elementIndicator = indicator.querySelector('.selected');

		let amountValue = amount.value;

		if (elementIndicator.className == 'debit selected') {
			amountValue = -1 * amount.value;
		}

		const transaction = {
			id: generateID(),
			text: text.value,
			amount: +amountValue,
		};

		transactions.push(transaction);

		addTransactionDOM(transaction);
		updateValues();
		updateLocalStorage();

		text.value = '';
		amount.value = '';
	}
}

// Generate random ID for object transaction
function generateID() {
	return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
	const sign = transaction.amount > 0 ? '+' : '-';

	const item = document.createElement('li');

	// Add class based on value
	item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

	item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
		transaction.amount
	)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;

	list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
	// Map through array
	const amounts = transactions.map((transaction) => transaction.amount);

	// SUM the amounts to have the total amount
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	// SUM income and expense
	const income = amounts
		.filter((amount) => amount > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);
	const expense = (amounts.filter((amount) => amount < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

	money_plus.innerText = `$ ${income}`;
	money_minus.innerText = `$ ${expense}`;
	balance.innerText = `$ ${total}`;
}

// Init app
function init() {
	list.innerHTML = '';

	transactions.forEach(addTransactionDOM);
	updateValues();
}

// Remove transaction by ID
function removeTransaction(id) {
	transactions = transactions.filter((transaction) => transaction.id !== id);
	updateLocalStorage();
	init();
}

// Update local storage transactions
function updateLocalStorage() {
	localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();

// Event listener

form.addEventListener('submit', addTransaction);

// amount.addEventListener('keydown', (e) => {
// 	if (!(e.key >= '0' && e.key <= 9) || !e.key === '.') {
// 		amount.value = '';
// 		alert('Apenas números e pontos permitidos.');
// 	}
// });

debit.addEventListener('click', () => {
	debit.classList.toggle('selected');
	credit.classList.remove('selected');
});
credit.addEventListener('click', () => {
	credit.classList.toggle('selected');
	debit.classList.remove('selected');
});
