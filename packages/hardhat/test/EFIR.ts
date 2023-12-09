import { expect } from "chai";
import { ethers } from "hardhat";
import { EFIR } from "../typechain-types";

describe("EFIR", function () {
  // We define a fixture to reuse the same setup in every test.

  let efir: EFIR;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const EFIRFactory = await ethers.getContractFactory("EFIR");
    efir = (await EFIRFactory.deploy(owner.address)) as EFIR;
    await efir.deployed();
  });
});
