require('dotenv').config()

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

// import '@eth-optimism/plugins/hardhat/compiler'
import "@eth-optimism/hardhat-ovm"

import { CHAIN_IDS } from './config/constants'

if (
  !process.env.DEPLOYER_PRIVATE_KEY
) {
  throw new Error('Missing .env or .env parameters')
}

const desiredAccounts: string[] = [
  process.env.DEPLOYER_PRIVATE_KEY
]

const isOptimizerEnabled: boolean = true
const numOptimizerRuns: number = 50000

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    mainnet: {
      url: process.env.RPC_ENDPOINT_MAINNET,
      accounts: desiredAccounts,
      chainId: CHAIN_IDS.ETHEREUM.MAINNET.toNumber(),
      timeout: 480e3
    },
    kovan: {
      url: process.env.RPC_ENDPOINT_KOVAN,
      accounts: desiredAccounts,
      chainId: CHAIN_IDS.ETHEREUM.KOVAN.toNumber(),
      timeout: 480e3
    },
    goerli: {
      url: process.env.RPC_ENDPOINT_GOERLI,
      accounts: desiredAccounts,
      chainId: CHAIN_IDS.ETHEREUM.GOERLI.toNumber()
    },
    arbitrum: {
      url: process.env.RPC_ENDPOINT_ARBITRUM,
      accounts: desiredAccounts,
      gasPrice: 0,
      chainId: CHAIN_IDS.ARBITRUM.TESTNET_4.toNumber(),
      timeout: 480e3
    },
    optimism: {
      url: process.env.RPC_ENDPOINT_OPTIMISM,
      accounts: desiredAccounts,
      gasPrice: 0,
      chainId: CHAIN_IDS.OPTIMISM.HOP_TESTNET.toNumber(),
      timeout: 480e3,
      ovm: true
    },
    xdai: {
      url: process.env.RPC_ENDPOINT_XDAI,
      accounts: desiredAccounts,
      gasPrice: 1000000000,
      gas: 500000,
      chainId: CHAIN_IDS.XDAI.XDAI.toNumber()
    },
    sokol: {
      url: process.env.RPC_ENDPOINT_SOKOL,
      accounts: desiredAccounts,
      gasPrice: 1000000000,
      gas: 500000,
      chainId: CHAIN_IDS.XDAI.SOKOL.toNumber()
    },
    polygon: {
      url: process.env.RPC_ENDPOINT_POLYGON,
      accounts: desiredAccounts,
      gasPrice: 1000000000,
      gas: 500000,
      chainId: CHAIN_IDS.POLYGON.POLYGON.toNumber()
    },
    mumbai: {
      url: process.env.RPC_ENDPOINT_MUMBAI,
      accounts: desiredAccounts,
      gasPrice: 1000000000,
      gas: 500000,
      chainId: CHAIN_IDS.POLYGON.MUMBAI.toNumber()
    }
  },
  ovm: {
    solcVersion: '0.6.12'
  },
  solidity: {
    compilers: [
      {
        settings: {
          optimizer: {
            enabled: isOptimizerEnabled,
            runs: numOptimizerRuns
          }
        },
        version: '0.5.16'
      }
    ]
  },
  mocha: {
    timeout: 40000
  }
  // abiExporter: {
  //   path: './data/abi',
  //   clear: true,
  //   flat: true
  // }
}
