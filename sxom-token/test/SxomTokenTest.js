const { expect } = require("chai");
const hre = require("hardhat");

describe("SxomToken contract", function(){
    // set global variables
    let token;
    let sxomToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function(){
        token = await ethers.getContractFactory("SxomToken");
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        sxomToken = await token.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await sxomToken.owner()).to.equal(owner.address);
        });
    
        it("Should assign the total supply of tokens to the owner", async function () {
          const ownerBalance = await sxomToken.balanceOf(owner.address);
          expect(await sxomToken.totalSupply()).to.equal(ownerBalance);
        });
      });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await sxomToken.transfer(addr1.address, 50);
            const addr1Balance = await sxomToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);
      
            // Transfer 50 tokens from addr1 to addr2
            await sxomToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await sxomToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);

          });

          it("Should fail if sender doesn't have enough tokens", async function () {
            const initialOwnerBalance = await sxomToken.balanceOf(owner.address);
            
            await expect(
              sxomToken.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWithCustomError(sxomToken, "ERC20InsufficientBalance");
      
            // Owner balance shouldn't have changed.
            expect(await sxomToken.balanceOf(owner.address)).to.equal(
              initialOwnerBalance
            );
          });
      
          it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await sxomToken.balanceOf(owner.address);
      
            // Transfer 100 tokens from owner to addr1.
            await sxomToken.transfer(addr1.address, 100);
      
            // Transfer another 50 tokens from owner to addr2.
            await sxomToken.transfer(addr2.address, 50);
      
            // Check balances.
            const finalOwnerBalance = await sxomToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(150));
      
            const addr1Balance = await sxomToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
      
            const addr2Balance = await sxomToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
          });
    })
});