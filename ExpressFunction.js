const _ 					= require('lodash');
const ethWallet 			= require('ethereumjs-wallet');
const ethUtil 				= require('ethereumjs-util');
const Tx 					= require('ethereumjs-tx');

module.exports = {
    deployAtAddress: function(web3, contractAddress, abi) {
        var abiContract = web3.eth.contract(abi);
        var myContract = abiContract.at(contractAddress);
        var data = {abiContract, myContract};
        return data;
    },

    TxSign: function(Txraw, privateKey) {
        var wallet =  ethWallet.fromPrivateKey(new Buffer.from(privateKey,'hex'));
        var tx = new Tx(Txraw);
        tx.sign(new Buffer.from(wallet.getPrivateKey(), 'hex'));
        var serialized = '0x' + tx.serialize().toString('hex');     
        return serialized;
        //redis & kue module
    },
    PayLoadData: function(functionName, arrayParams,abi) {
        var solFunction = new SolFunction('', _.find(abi, {name: functionName}),'');
        var payloadData = solFunction.toPayload(arrayParams).data;
        return payloadData;
    },
};