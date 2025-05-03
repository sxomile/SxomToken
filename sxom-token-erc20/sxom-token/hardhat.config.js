require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const {PRIVATE_KEY, INFURA_SEPOLIA_ENDPOINT} = process.env;

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: INFURA_SEPOLIA_ENDPOINT,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
