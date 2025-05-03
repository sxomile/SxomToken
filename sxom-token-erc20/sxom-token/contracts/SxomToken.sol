// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract SxomToken is ERC20Capped {
    
    address payable public owner;

    constructor() ERC20("SxomToken", "SXT") ERC20Capped(5000000 * (10 ** decimals())){
        owner = payable(msg.sender);
        _mint(owner, 5000000 * (10 ** decimals()));
    }

    function destroy() public onlyOwner() {
        selfdestruct(owner);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can make this call!");
        _;
    }

}