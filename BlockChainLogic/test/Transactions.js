const { expectRevert, constants, time } = require('@openzeppelin/test-helpers');
const Transaction = artifacts.require('Transactions.sol');
const InBilloToken = artifacts.require('InBilloToken.sol');


contract('Transaction', addresses => {
    const [admin, merchant, buyer, _] = addresses;
    let transaction, token;

    beforeEach(async() => {
        token = await InBilloToken.new();
        transaction = await Transaction.new(token.address);
        await token.transfer(buyer, 1000);
        await token.approve(transaction.address, 1000, { from: buyer });
    });

    it('should create an instrument', async() => {
        await transaction.createInstrument(token.address, 100, 'stocks', { from: merchant });
        const instrument1 = await transaction.instruments(0);
        assert(instrument1.token === token.address);
        assert(instrument1.amount.toString() === '100');
        assert(instrument1.name === 'stocks');

        await transaction.createInstrument(token.address, 200, 'bonds', { from: merchant });
        const instrument2 = await transaction.instruments(1);
        assert(instrument2.token === token.address);
        assert(instrument2.amount.toString() === '200');
        assert(instrument2.name === 'bonds');
    });

    it('should NOT create an instrument', async() => {
        await expectRevert(
            transaction.createInstrument(constants.ZERO_ADDRESS, 100, 'bonds', { from: merchant }),
            'address cannot be null address'
        );
        await expectRevert(
            transaction.createInstrument(token.address, 0, 'bonds', { from: merchant }),
            'amount needs to be > 0'
        );
        await expectRevert(
            transaction.createInstrument(token.address, 100, '', { from: merchant }),
            'Name is required'
        );
    });

    it('should make purchase', async() => {
        let balanceMerchant, balanceBuyer;
        await transaction.createInstrument(token.address, 100, 'stocks', { from: merchant });

        await transaction.purchase(0, { from: buyer });
        balanceMerchant = await token.balanceOf(merchant);
        balanceBuyer = await token.balanceOf(buyer);
        assert(balanceMerchant.toString() === '100');
        assert(balanceBuyer.toString() === '900');

    });
    it('should send funds', async() => {
        let balanceMerchant, balanceBuyer;
        let fundTxn = await transaction.sendFunds(merchant, 100, { from: buyer });
        console.log(fundTxn.logs[0].event);
        console.log(fundTxn.logs[0].args.amount)
        balanceMerchant = await token.balanceOf(merchant);
        balanceBuyer = await token.balanceOf(buyer);
        assert(balanceMerchant.toString() === '100');
        assert(balanceBuyer.toString() === '900');

    });




});