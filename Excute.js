const Transaction = require('./Transaction');
const Config = require('./Config');

// // Transaction.getUsername();
// Transaction.setAccount("test", "test2");
Transaction.buy(Config.addressBuy, Config.privateKeyBuyer, Config.contractAdress, 150);