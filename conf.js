module.exports = {
    BASE_URL: "https://coinmarketcap.com",
    getCURRENCY_URL: function(currency) {
        return `https://coinmarketcap.com/currencies/${currency.toLowerCase()}/`;
    },
    CURRENCIES: ["Bitcoin", "Dogcoin", "Pepe"],
    REAL_CURRENCIES: ["Euro", "United States Dollar", "Pound Sterling", "Bitcoin", "Ethereum", "Bulgarian Lev"],
    CURRENCY_SYMBOLS: ["€", "$", "£"]
};