const API_KEY =
  "ea0b6df79bfa673ccf63634eeb54481eef3eeee83794ac3e95f14e9e86fe2437";

export const loadTicker = (tickerName) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=${API_KEY}`
  ).then((r) => r.json());

export const loadCoinList = () =>
  fetch(
    `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
  ).then((r) => r.json());

/* TODO refactor to use URLSearchParams */
