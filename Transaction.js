const _ 					= require('lodash');
const ethWallet 			= require('ethereumjs-wallet');
const ethUtil 				= require('ethereumjs-util');
const Tx 					= require('ethereumjs-tx');
const Web3 					= require('web3');
// const SolFunction 			= require('web3/lib/web3/function');
const Config                = require('./Config');
const ExpressFunction       = require('./ExpressFunction');
const  web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Z4It2Ma8e6CaZDeRH2HB'));
const abiContract = new web3.eth.Contract(Config.abi);

module.exports = {
    deploy: async function deploy(address, privateKey) {
        var myContract = new web3.eth.Contract(Config.abi);
        var selt = myContract.deploy({
             data: Config.dataContract,
             arguments: [100, "MyToken"]
            }).encodeABI();
        var result = await  web3.eth.getTransactionCount(address);
        var Txraw = await {
        nonce: result,
        gasPrice: web3.utils.toHex(web3.utils.toWei('40','Gwei')),
        gasLimit: web3.utils.toHex('973182'),
        data:  selt,
        from: address
        };

        var TxSign = await ExpressFunction.TxSign(Txraw, privateKey);
    
        await web3.eth.sendSignedTransaction( TxSign)
        .on('transactionHash', function(hash){
            console.log('47 ',hash);
        })
        .on('receipt', function(receipt){
            console.log('50 ',receipt.contractAddress);
            console.log('50 ', receipt.from);
         })
        .on('error', console.error); 
    },
    getUsername: function getUsername(address) {
        var myContract = new web3.eth.Contract(Config.abi,Config.contractAdress,{
            from: address,
            data:Config.dataContract,
        });
        myContract.methods.getUsername().call({from: address}, function(error, result){
            console.log(error,result);
        });
    },
    setAccount: async function setAccount(name, pass, address, contractAddress, privateKey) {
        var result = await web3.eth.getTransactionCount(address); 
        var tx_builder = abiContract.methods.setAccount(name, pass);
        var encoded_tx = tx_builder.encodeABI();
        var Txraw = {
        nonce: result,
        gasPrice: web3.utils.toHex(web3.utils.toWei('40','Gwei')),
        gasLimit: web3.utils.toHex('973182'),
        data:  encoded_tx,
        from: addressBuy,
        to: contractAddress,
        };

        var TxSign = ExpressFunction.TxSign(Txraw, privateKey);
    
        web3.eth.sendSignedTransaction(TxSign)
        .on('transactionHash', function(hash){
             console.log('98 ',hash);
        })
        .on('receipt', function(receipt){
            console.log('101 ', receipt);
         })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    },
    setBalances : async function setBalances(username, amount, address, contractAddress, privateKey) {
        var result = await web3.eth.getTransactionCount(address); 
        var tx_builder = abiContract.methods.setBalances(username, amount);
        var encoded_tx = tx_builder.encodeABI();
        var Txraw = {
        nonce: result,
        gasPrice: web3.utils.toHex(web3.utils.toWei('40','Gwei')),
        gasLimit: web3.utils.toHex('973182'),
        data:  encoded_tx,
        from: address,
        to: contractAddress,
        };

        var TxSign = ExpressFunction.TxSign(Txraw, privateKey);
    
        web3.eth.sendSignedTransaction(TxSign)
        .on('transactionHash', function(hash){
             console.log('98 ',hash);
        })
        .on('receipt', function(receipt){
            console.log('101 ', receipt);
         })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    },
    transfer: async function transfer(addressTransfer, ownerAdress, contractAddress, privateKey) {
        var result = await web3.eth.getTransactionCount(ownerAdress); 
        var tx_builder = abiContract.methods.TransferOwner(addressTransfer);
        var encoded_tx = tx_builder.encodeABI();
        var Txraw = {
        nonce: result,
        gasPrice: web3.utils.toHex(web3.utils.toWei('40','Gwei')),
        gasLimit: web3.utils.toHex('973182'),
        data:  encoded_tx,
        from: ownerAdress,
        to: contractAddress,
        };

        var TxSign = ExpressFunction.TxSign(Txraw, privateKey);
    
        web3.eth.sendSignedTransaction(TxSign)
        .on('transactionHash', function(hash){
             console.log('98 ',hash);
        })
        .on('receipt', function(receipt){
            console.log('101 ', receipt);
         })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    },
    buy: async function buy(addressBuy, privateKeyBuyer, contractAddress, value) {
        var result = await web3.eth.getTransactionCount(addressBuy); 
        var tx_builder = abiContract.methods.buy();
        var encoded_tx = tx_builder.encodeABI();
        var Txraw = await {
        nonce: result,
        gasPrice: web3.utils.toHex(web3.utils.toWei('40','Gwei')),
        gasLimit: web3.utils.toHex('973182'),
        data:  encoded_tx,
        from: addressBuy,
        value: web3.utils.toHex(web3.utils.toWei(value.toString(),'wei')),
        to: contractAddress,
        };
        var TxSign = await ExpressFunction.TxSign(Txraw, privateKeyBuyer);
        web3.eth.sendSignedTransaction(TxSign)
        .on('transactionHash', function(hash){
            console.log('98 ',hash);
        })
        .on('receipt', function(receipt){
            console.log('101 ', receipt);
        })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
        }
};
























// var promise1 = new Promise(function (resolve , reject) {
//     web3.eth.getTransactionCount(Config.address, function(err, result) {
// if(!err) {
//     resolve(result);
// }
// else {
//     reject(err);
// }
// });
// });

// Promise.all([promise1]).then(function(values) {
//     var privateKey = Config.privateKey;
//     var selt = myContract.deploy({
//         data: Config.dataContract,
//         arguments: ['Hien', 'HienVu',100]
//     }).encodeABI();
//     var Txraw = {
//         nonce: values,
//         gasPrice: web3.utils.toHex(web3.utils.toWei('4','Gwei')),
//         gasLimit: web3.utils.toHex('900000'),
//         data:  selt,
//         from: Config.address
//     };
//     console.log(Txraw);
//     TxSign = ExpressFunction.TxSign(Txraw, privateKey);
    
//     web3.eth.sendSignedTransaction( TxSign, function(err, hash) {
//         console.log(hash);
//     })


//   });










