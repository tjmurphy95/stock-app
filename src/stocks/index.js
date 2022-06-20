import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const modal = writable(null);

const defaultValue = [];
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('stocklist')) ?? defaultValue
	: defaultValue;
const StockStore = writable(initialValue);

StockStore.subscribe((val) => {
	if (browser) {
		window.localStorage.setItem('stocklist', JSON.stringify(val));
	}
});

export default StockStore;
