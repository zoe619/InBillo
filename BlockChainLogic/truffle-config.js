const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const mnemonic = process.env.MNEMONIC
const url = process.env.RINKEBY_RPC_URL
const private_key = process.env.PRIVATE_KEY
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    networks: {
        cldev: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*',
        },
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
        },
        kovan: {
            provider: () => {
                return new HDWalletProvider(mnemonic, url)
            },
            network_id: '42',
            skipDryRun: true
        },
        rinkeby: {
            provider: () => {
                return new HDWalletProvider(private_key, url)
            },

            network_id: '4',
            skipDryRun: true
        },
    },
    compilers: {
        solc: {
            version: '0.8.6',
        },
    },
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        etherscan: ETHERSCAN_KEY
    }
}