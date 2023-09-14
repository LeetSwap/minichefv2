
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";

import { utils, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });

import("./scripts/index")
.catch((err) => {
  console.log("./scripts/index not imported until after build completes")
});

const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || (Wallet.createRandom()).privateKey;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {
      gasPrice: utils.parseUnits("60", "gwei").toNumber(),
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    canto: {
      url: "https://canto.slingshot.finance",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    opbnb: {
      url: "https://opbnb-mainnet-rpc.bnbchain.org",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    shibarium: {
      url: "https://www.shibrpc.com",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    linea: {
      url: "https://rpc.linea.build",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    manta: {
      url: "https://pacific-rpc.manta.network/http",
      accounts: [DEPLOYER_PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },

  },
  abiExporter: {
    path: "./dist/abi",
    clear: false,
    flat: true
  },
  typechain: {
    outDir: './dist/types',
    target: 'ethers-v5',
  },
};


export default config;
