const Transaction = artifacts.require('./Transactions.sol');
const InBilloToken = artifacts.require('./InBilloToken.sol');



module.exports = function(deployer) {
    deployer.deploy(InBilloToken).then(function() {
        return deployer.deploy(Transaction, InBilloToken.address)
    });
};