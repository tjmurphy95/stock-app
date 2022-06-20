<script>
	let inputValue = '';
	import StockStore from '../stocks';
	async function updateStocks() {
		$StockStore = [...new Set([inputValue, $StockStore])];
		inputValue = '';
		console.log($StockStore);
	}
</script>

<div class="relative">
	<input
		bind:value={inputValue}
		type="text"
		placeholder="Stock Ticker"
		class="w-full bg-slate-900 py-3 px-4 text-white outline-0 text-4xl"
	/>
	<div
		type="submit"
		on:click={updateStocks}
		class="absolute uppercase top-0 right-0 h-full flex items-center px-4 bg-amber-500 text-white transition duration-300 hover:bg-amber-800 text-xl curser-pointer"
	>
		ADD
	</div>
</div>
