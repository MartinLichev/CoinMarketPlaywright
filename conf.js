module.exports = {
    BASE_URL: "https://coinmarketcap.com",
    getCURRENCY_URL: function(currency) {
        return `https://coinmarketcap.com/currencies/${currency}/`;
    },
    CURRENCIES: ["Bitcoin", "Dogcoin", "Pepe"]
};