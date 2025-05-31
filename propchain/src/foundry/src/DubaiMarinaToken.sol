// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DubaiMarinaToken is ERC20, Ownable {
    constructor() ERC20("Dubai Marina Gate Tower 2 Token", "DMG") Ownable(msg.sender) {
        // Mint 100,000 tokens to the contract deployer
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    // Function to mint additional tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Function to get token decimals (18 decimals by default)
    function decimals() public pure override returns (uint8) {
        return 18;
    }
} 