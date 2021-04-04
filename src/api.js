const API_KEY =
  "ea0b6df79bfa673ccf63634eeb54481eef3eeee83794ac3e95f14e9e86fe2437";

const tickersHandlers = new Map();

const loadtickersHandlers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys()
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );
      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribes = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribes, cb]);
};

export const unsubscribeToTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};
//суть подписчика и отписчика объясняется в 18 видео на 00:58

setInterval(loadtickersHandlers, 5000);

export const loadCoinList = () =>
  fetch(
    `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
  ).then((r) => r.json());

/* TODO refactor to use URLSearchParams*/

window.tickersHandlers = tickersHandlers;
