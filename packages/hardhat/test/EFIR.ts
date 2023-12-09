import { expect } from "chai";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { EFIR } from "../typechain-types";

describe("EFIR", function () {
  let EFIRToken;
  let efirToken: any;
  let owner: any;
  let officer;

  beforeEach(async function () {
    [owner, officer] = await ethers.getSigners();

    EFIRToken = await ethers.getContractFactory("EFIR");
    efirToken = await EFIRToken.deploy();
    await efirToken.deployed();
  });

  it("should create an FIR and emit OpenedFIR event", async function () {
    const location = "Some Location";
    const tokenUri = "https://example.com/metadata.json";

    const transaction = await efirToken.fileFIR(tokenUri, location);

    const receipt = await transaction.wait();
    console.log(receipt);
  });
});
