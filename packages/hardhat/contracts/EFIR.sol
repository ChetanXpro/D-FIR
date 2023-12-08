// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FIRSystem is ERC1155, Ownable {
    uint256 public s_currentFIRId;
    mapping(uint256 => address) public s_assignedOfficer;
    mapping(uint256 => string) private s_tokenURIs;
    mapping(uint256 => bool) private s_firToOfficer;

    event FiledFir(address indexed owner, uint256 tokenId, uint256 timeRecorded);
    event AssignedOfficer(address indexed officer, uint256 tokenId, uint256 timeRecorded);

    constructor() ERC1155("") Ownable(msg.sender) {
        s_currentFIRId = 0;
    }

    function fileFIR(string memory tokenUri) public returns (uint256) {
        uint256 newFIRId = s_currentFIRId++;
        _mint(msg.sender, newFIRId, 1, "");
        _setTokenURI(newFIRId, tokenUri);
        return newFIRId;
    }

    function assignOfficer(uint256 firId, address officer) public onlyOwner {
        require(exists(firId), "FIR does not exist");
        require(!s_firToOfficer[firId], "Already assigned officer");
        s_firToOfficer[firId] = true;
        s_assignedOfficer[firId] = officer;
        _mint(officer, firId, 1, "");
    }

    function updateFIR(uint256 firId, string memory tokenUri) public {
        require(msg.sender == owner() || msg.sender == s_assignedOfficer[firId], "Not authorized");
        _setTokenURI(firId, tokenUri);
    }

    function uri(uint256 firId) public view override returns (string memory) {
        require(exists(firId), "FIR does not exist");
        return s_tokenURIs[firId];
    }

    function _setTokenURI(uint256 firId, string memory newuri) internal virtual {
        s_tokenURIs[firId] = newuri;
    }

    function exists(uint256 firId) public view returns (bool) {
        return bytes(s_tokenURIs[firId]).length > 0;
    }
}
