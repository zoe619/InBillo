//SPDX-License-Identifer: MIT
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract InBilloToken is ERC20 {
  constructor() ERC20('InBilloToken', 'IBK') {
    _mint(msg.sender, 1000);
  }
}

