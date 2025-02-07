const currency_1 = document.getElementById('currency-one');
const currency_2 = document.getElementById('currency-two');
const amount_1 = document.getElementById('amount-one');
const amount_2 = document.getElementById('amount-two');
const rates = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch Exchange Rates and Update the DOM
function calculate() {
	const varCurrency1 = currency_1.value;
	const varCurrency2 = currency_2.value;

	fetch(`https://v6.exchangerate-api.com/v6/8da55ecb6c067cd199953fee/latest/${varCurrency1}`)
		.then((res) => res.json())
		.then((data) => {
			const rate = data.conversion_rates[varCurrency2];
			rates.innerText = `1 ${varCurrency1} = ${rate} ${varCurrency2}`;
			amount_2.value = (rate * amount_1.value).toFixed(2);
		})
		.catch((error) => console.log(error));
}

// Event Listeners
currency_1.addEventListener('change', calculate);
amount_1.addEventListener('input', calculate);
currency_2.addEventListener('change', calculate);
amount_2.addEventListener('input', calculate);

swap.addEventListener('click', () => {
	const varCurrency1 = currency_1.value;
	const varCurrency2 = currency_2.value;

	currency_2.value = varCurrency1;
	currency_1.value = varCurrency2;

	calculate();
});

calculate();
