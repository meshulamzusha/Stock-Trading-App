import { question, keyInSelect, keyInYN } from 'readline-sync'
import { searchStock, filterStocksByPrice, operateOnStock } from './services.js'

function handleUserOperationChoice() {
    const options = [,'Search for a stock by name or id', 'Show all stock above or below a given price', 'Buy or sell a stock', 'Exit'];
    const choice = keyInSelect(options)
    

    switch (choice) {
        case 1:
            const searchIdentifier = question('Enter a name or ID.\n> ');
            console.table(searchStock(searchIdentifier));
            break;

        case 2:
            const price = question('Enter the price.\n> ');
            const above = keyInYN('You want the stocks whose price is higher than the price you entered.');
            console.table(filterStocksByPrice(price, above));
            break;
        
        case 3:
            const operation = question('buy or sell?\n> ');

            if (operation != 'buy' && operation != 'sell') {
                console.log('The operation you want does not exist.');
            }

            const operationIdentifier =  question('Enter a name or ID.\n> ');
            operateOnStock(operation, operationIdentifier);

        case 4:
            break;

        default:
            break;
    }

    return choice;
}


function runApp() {
    let isRun = true;

    while (isRun) {
        const choice = handleUserOperationChoice();
        if (choice === 4) {
            isRun = false;
        }
    }
}

runApp()