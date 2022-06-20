<script context="module" ;>
	export async function load({ fetch, params }) {
		const baseUrl = 'https://tom-stock-app.herokuapp.com/';
		//place holder stock
		const stock = 'mrna';
		const response = await fetch(baseUrl + stock + '?key=testkey');
		const data = await response.json();

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
	export let stocks;
	console.log(stocks);
</script>
