// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstate1155 is ERC1155, Ownable {
    uint256 public nextPropertyId = 1;
    uint256 public constant FRACTIONS = 1_000_000;

    // Optional: metadata for each property
    mapping(uint256 => string) public propertyURIs;

    event PropertyCreated(uint256 indexed propertyId, string uri);

    constructor() ERC1155("") Ownable(msg.sender){}

    function createProperty(address to, string memory propertyUri) external onlyOwner returns (uint256) {
        uint256 propertyId = nextPropertyId++;
        _mint(to, propertyId, FRACTIONS, "");
        propertyURIs[propertyId] = propertyUri;
        emit PropertyCreated(propertyId, propertyUri);
        return propertyId;
    }

    function uri(uint256 propertyId) public view override returns (string memory) {
        return propertyURIs[propertyId];
    }
}