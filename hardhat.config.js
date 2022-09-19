require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_URL = process.env.NEXT_PUBLIC_ALCHEMY_URL;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      },
    },
  },
};
