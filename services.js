import { question } from 'readline-sync';
import { stockMarket } from './db.js';

export function searchStock(identifier) {
    const stocks = stockMarket.stocks
    const matchedStocks = stocks.filter((stock) => {
        return stock.id === identifier || stock.name === identifier;
    })

    if (matchedStocks.length === 0 ) {
        console.log('\nThe stock you are looking for does not exist.');
    }

    return matchedStocks;
}


export function filterStocksByPrice(price, above) {
    const stocks = stockMarket.stocks;
    const filteredStocks = stocks.filter((stock) => {
        if (above) {
            return stock.currentPrice >= price;
        } else if (!above) {
            return stock.currentPrice <= price;
        } else {
            console.log('You entered a character that is not y or n.');
        }
    })

    return filteredStocks;
}


function buyStockOperation(stockToOperate, amount) {
    const stocks = stockMarket.stocks
    stockToOperate.previousPrices.push(stockToOperate.currentPrice);
    const priceIncrease = (stockToOperate.currentPrice / 100) * 5;
    stockToOperate.currentPrice += priceIncrease;

    stocks.forEach((stock) => {
        if (stock.category === stockToOperate.category && stock.name != stockToOperate.name) {
            stock.previousPrices.push(stock.currentPrice);
            stock.currentPrice += (stock.currentPrice / 100);
        }
    })

    stockMarket.lastUpdated = new Date().toJSON();

    if (stockToOperate.availableStocks - amount > 0) {
        stockToOperate.availableStocks -= amount;
    } else {
        console.log(`This stock has only ${stockToOperate.availableStocks} available`);
    } 
}

function sellStockOperation(stockToOperate, amount) {
    const stocks = stockMarket.stocks
    stockToOperate.previousPrices.push(stockToOperate.currentPrice);
    const priceDecrease = (stockToOperate.currentPrice / 100) * 5;
    stockToOperate.currentPrice -= priceDecrease;


    stocks.forEach((stock) => {
        if (stock.category === stockToOperate.category && stock.name != stockToOperate.name) {
            stock.previousPrices.push(stock.currentPrice);
            stock.currentPrice -= (stock.currentPrice / 100);
        }
    })

    stockMarket.lastUpdated = new Date().toJSON();
    stockToOperate.availableStocks += amount;
}


export function operateOnStock(operation, identifier) {
    const stockToOperate = searchStock(identifier)[0];

    if (stockToOperate != undefined) {
        const amount = question('How many stocks do you want operate of?\n> ');
    
        if (operation === 'buy') {
            buyStockOperation(stockToOperate, amount)
        }

        if (operation === 'sell') {
            sellStockOperation(stockToOperate, amount)
        }

    }
}