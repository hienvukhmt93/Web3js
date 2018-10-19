const _ 					= require('lodash');
const ethWallet 			= require('ethereumjs-wallet');
const ethUtil 				= require('ethereumjs-util');
const Tx 					= require('ethereumjs-tx');
const Web3 					= require('web3');
// const SolFunction 			= require('web3/lib/web3/function');
const Config                = require('./Config');
const ExpressFunction       = require('./ExpressFunction');


// var  web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Z4It2Ma8e6CaZDeRH2HB'));

var abi = Config.abi;
var contractAddress = '0x255830a4e3E04cBcF1149AC34EC23D459488C906';
web3 = new Web3();
const eventProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/Z4It2Ma8e6CaZDeRH2HB');
web3.setProvider(eventProvider);

var myContract = new web3.eth.Contract(abi,contractAddress);

// myContract.getPastEvents('CreateContract', {
//     filter: 'latest', // Using an array means OR: e.g. 20 or 23
//     fromBlock: 0,
//     toBlock: 'latest'
// }, function(error, events){ console.log(events); })
// .then(function(events){
//     console.log(events) // same results as the optional callback above
// });


var subscription = web3.eth.subscribe('logs', {
    address: Config.address
}, function(error, result){
    console.log("callback >>>>>>>>", error, result);
    if (!error)
        console.log(result);
}).on("data", function(data){
    console.log("data >>>>>>>>>>", data);
}).on("changed", function(data){
    console.log(" changed >>>>>>>>>>", data);
});