// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract EFIR is ERC721, ERC721URIStorage, ERC721Burnable {
    uint256 private _currentFIRId;
    uint256[] private s_firIds;
    mapping(uint256 => address) public firApprovedToOfficer;
    mapping(uint256 => address) public assignedOfficer;

    event FiledFIR(address indexed owner, uint256 tokenId, uint256 timeRecorded);
    event AssignedOfficer(address indexed officer, uint256 tokenId, uint256 timeRecorded);
    event UpdatedFIR(address indexed officer, uint256 tokenId, uint256 timeRecorded, string tokenUri);

    constructor() ERC721("EFIRToken", "EFIRT") {
        _currentFIRId = 0;
    }

    function fileFIR(string memory tokenUri) public returns (uint256) {
        uint256 newFIRId = _currentFIRId++;
        _mint(msg.sender, newFIRId);
        _setTokenURI(newFIRId, tokenUri);
        s_firIds.push(newFIRId);
        emit FiledFIR(msg.sender, newFIRId, block.timestamp);
        return newFIRId;
    }

    function approveOfficer(uint256 firId, address officer) public {
        require(ownerOf(firId) == msg.sender, "ERC721: caller is not the owner");
        firApprovedToOfficer[firId] = officer;
    }

    function assignOfficer(uint256 firId) public {
        require(_exists(firId), "ERC721: FIR does not exist");
        address approvedOfficer = firApprovedToOfficer[firId];
        require(approvedOfficer == msg.sender, "ERC721: Not approved officer");

        assignedOfficer[firId] = approvedOfficer;
        _transfer(msg.sender, approvedOfficer, firId);
        emit AssignedOfficer(approvedOfficer, firId, block.timestamp);
    }

    function updateFIR(uint256 firId, string memory tokenUri) public {
        require(assignedOfficer[firId] == msg.sender, "ERC721: Not authorized officer");
        _setTokenURI(firId, tokenUri);
        emit UpdatedFIR(msg.sender, firId, block.timestamp, tokenUri);
    }

    function burn(uint256 tokenId) public override {
        _burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenUri) internal override(ERC721URIStorage) {
        super._setTokenURI(tokenId, tokenUri);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        for (uint256 i = 0; i < s_firIds.length; i++) {
            if (s_firIds[i] == tokenId) {
                return true;
            }
        }
        return false;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
