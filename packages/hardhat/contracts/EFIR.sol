// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract EFIR is ERC721, ERC721URIStorage, ERC721Burnable {
    enum FIRstate {
        OPENED,
        INVESTIGATING,
        CLOSED
    }

    uint256 private _currentFIRId;
    uint256[] private s_firIds;
    mapping(uint256 => address) public s_firApprovedToOfficer;
    mapping(uint256 => string) public s_firIdToLocation;
    mapping(uint256 => address) public s_assignedOfficer;
    mapping(uint256 => string) private previousOwnerNames;
    mapping(uint256 => FIRstate) private s_firIdToStatus;

    event OpenedFIR(address indexed owner, uint256 firId, uint256 timeRecorded, string indexed location);
    event AssignedOfficer(address indexed officer, uint256 firId, uint256 timeRecorded);
    event UpdatedFIR(address indexed officer, uint256 firId, uint256 timeRecorded, string tokenUri);
    event ClosedFIR(address indexed officer, uint256 firId, uint256 timeRecorded);

    constructor() ERC721("EFIRToken", "EFIRT") {
        _currentFIRId = 0;
    }

    function fileFIR(string memory tokenUri, string memory location) public returns (uint256) {
        uint256 newFIRId = _currentFIRId++;
        _mint(msg.sender, newFIRId);
        _setTokenURI(newFIRId, tokenUri);
        s_firIds.push(newFIRId);
        s_firIdToStatus[newFIRId] = FIRstate.OPENED;
        s_firIdToLocation[newFIRId] = location;
        emit OpenedFIR(msg.sender, newFIRId, block.timestamp, location);
        return newFIRId;
    }

    function approveOfficer(uint256 firId, address officer) public {
        require(ownerOf(firId) == msg.sender, "ERC721: caller is not the owner");
        s_firApprovedToOfficer[firId] = officer;
    }

    function assignOfficer(uint256 firId) public {
        require(_exists(firId), "ERC721: FIR does not exist");
        address approvedOfficer = s_firApprovedToOfficer[firId];
        require(approvedOfficer == msg.sender, "ERC721: Not approved officer");
        s_firIdToStatus[firId] = FIRstate.INVESTIGATING;
        s_assignedOfficer[firId] = approvedOfficer;
        _transfer(msg.sender, approvedOfficer, firId);
        emit AssignedOfficer(approvedOfficer, firId, block.timestamp);
    }

    function updateFIR(uint256 firId, string memory tokenUri) public {
        require(s_assignedOfficer[firId] == msg.sender, "ERC721: Not authorized officer");
        _setTokenURI(firId, tokenUri);
        emit UpdatedFIR(msg.sender, firId, block.timestamp, tokenUri);
    }

    function burn(uint256 firId) public override {
        for (uint256 i = 0; i < s_firIds.length; i++) {
            if (s_firIds[i] == firId) {
                // Remove firId from the array by swapping with the last element
                s_firIds[i] = s_firIds[s_firIds.length - 1];
                s_firIds.pop();
                break; // Exit the loop once the swap is done
            }
        }
        emit ClosedFIR(s_assignedOfficer[firId], firId, block.timestamp);
        s_assignedOfficer[firId] = address(0);
        s_firApprovedToOfficer[firId] = address(0);
        s_firIdToStatus[firId] = FIRstate.CLOSED;
        _burn(firId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 firId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(firId);
    }

    function _setTokenURI(uint256 firId, string memory imageURI) internal override(ERC721URIStorage) {
        // Construct the metadata JSON object.
        super._setTokenURI(firId, imageURI);
    }

    function _exists(uint256 firId) internal view returns (bool) {
        for (uint256 i = 0; i < s_firIds.length; i++) {
            if (s_firIds[i] == firId) {
                return true;
            }
        }
        return false;
    }

    function getAllFIRs() internal view returns (uint256[] memory) {
        return s_firIds;
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
