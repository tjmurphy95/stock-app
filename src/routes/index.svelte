<script context="module">
	//get started with tailwind svelte
	//whenever doing api calls use context="module"
	import StockStore from '../stocks';
	let stocks = [];
	const unsub = StockStore.subscribe((val) => {
		stocks = val;
	});
	unsub();
	export async function load({ fetch, params }) {
		//where params is url params
		const baseUrl = 'https://tom-stock-app.herokuapp.com/';
		const data = await Promise.all(
			stocks.map(async (stock) => {
				const response = await fetch(baseUrl + stock + '?key=testkey');
				return await response.json();
			})
		);

		if (data) {
			return {
				props: {
					stocks: data
				}
			};
		}
	}
</script>

<script>
	import StockList from '../components/StockList.svelte';
	export let stocks;
	console.log(stocks);

	$: getData($StockStore);
	async function getData(newTickers) {
		const oldTickers = stocks.map((val) => {
			Object.keys(val)[0];
		});
		if (newTickers.length < oldTickers.length) {
			return (stocks = stocks.filter((val) => newTickers(Object.keys(val)[0])));
		}
		let difference = newTickers.filter((val) => !oldTickers.includes(val));
		const baseUrl = 'https://tom-stock-app.herokuapp.com/';
		const data = await Promise.all(
			difference.map(async (stock) => {
				const response = await fetch(baseUrl + stock + '?key=testkey');
				return response.json();
			})
		);
		stocks = [...data, ...stocks].filter((stock) => {
			const ticker = Object.keys(stock)[0];
			return stock[ticker]?.prices?.length > 50;
		});
	}
</script>

<section class="flex flex-column relative">
	{#if stocks.length > 0}
		<StockList {stocks} />
	{/if}
</section>
