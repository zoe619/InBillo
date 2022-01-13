//SPDX-License-Identifer: MIT
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Transactions {

  uint public instrumentId;
  address public tokenAddress;

  constructor(address token){
     tokenAddress = token;
  }

  struct Instruments {
    address merchant;
    address token;
    uint amount;
    string name;
    
  }
  struct Purchases {
    address buyer;
    uint date;
  }
  mapping(uint => Instruments) public instruments;
  mapping(address => mapping(uint => Purchases)) public purchases;
  

  event InstrumentsCreated(
    address merchant,
    uint instrumentId,
    uint amount,
    uint date,
    string name
  );
  event PurchaseCreated(
    address buyer,
    address seller,
    uint amount,
    uint instrumentsId,
    uint date
  );
  event PaymentSent(
    address from,
    address to,
    uint amount,
    uint instrumentId,
    uint date
  );

  event FundsTransfer(
      address from,
      address to,
      uint256 amount,
      uint256 date,
      string _type
  );

  function createInstrument(address token, uint amount, string memory name) external {
    require(token != address(0), 'address cannot be null address');
    require(amount > 0, 'amount needs to be > 0');
    bytes memory testName = bytes(name);
    require(testName.length != 0, 'Name is required');
    instruments[instrumentId] = Instruments(
      msg.sender, 
      token,
      amount, 
      name
    );
    instrumentId++;
    emit InstrumentsCreated(
        msg.sender,
        instrumentId,
        amount,
        block.timestamp,
        name
    );
  }

  function purchase(uint instId) external payable {
    // pointer to token
    IERC20 token = IERC20(instruments[instId].token);
    // pointer to instruments
    Instruments storage instruts = instruments[instId];
    require(instruts.merchant != address(0), 'this instrument does not exist');

    // transfer coin from buyer to merchant
    token.transferFrom(msg.sender, instruts.merchant, instruts.amount);  
    emit PaymentSent(
      msg.sender, 
      instruts.merchant, 
      instruts.amount, 
      instId, 
      block.timestamp
    );

    purchases[msg.sender][instId] = Purchases(
      msg.sender, 
      block.timestamp
    );
    emit PurchaseCreated(
        msg.sender, 
        instruts.merchant, 
        instruts.amount, 
        instId, 
        block.timestamp);
  }


  function sendFunds(address payable receiver, uint256 amount) external payable
  {
  
    IERC20 token = IERC20(tokenAddress);
    require(
      receiver != address(0), 
      'this receivers address does not exist'
    );
   

    token.transferFrom(msg.sender, receiver, amount);  
    emit FundsTransfer(
      msg.sender,
      receiver, 
      amount, 
      block.timestamp,
      'lending/borrowing'
    );
    
  }
}