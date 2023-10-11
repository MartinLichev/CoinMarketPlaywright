module.exports = {
    BASE_URL: "https://coinmarketcap.com",
    getCURRENCY_URL: function(currency) {
        return `https://coinmarketcap.com/currencies/${currency.toLowerCase()}/`;
    },
    CURRENCIES: ["Bitcoin", "Dogcoin", "Pepe"],
    REAL_CURRENCIES: ["Euro", "United States Dollar", "Pound Sterling", "Bitcoin", "Ethereum", "Bulgarian Lev"],
    CURRENCY_SYMBOLS: ["€", "$", "£"],
    NAVIGATION_URLS:{
        PORTFOLIO: "https://coinmarketcap.com/portfolio-tracker/",
        COMMUNITY: "https://coinmarketcap.com/community/",
        NEWS: "https://coinmarketcap.com/headlines/news/",
        EXCHANGES: "https://coinmarketcap.com/rankings/exchanges/",
        WATCHLIST: "https://coinmarketcap.com/watchlist/",
    }
};