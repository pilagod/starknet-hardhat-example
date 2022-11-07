import { HardhatUserConfig } from "hardhat/types";
import "@shardlabs/starknet-hardhat-plugin";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    solidity: "0.6.12",
    starknet: {
        // dockerizedVersion: "0.10.1", // alternatively choose one of the two venv options below
        venv: "active", // for the active virtual environment with installed starknet-devnet
        // venv: "path/to/venv", // for env with installed starknet-devnet (created with e.g. `python -m venv path/to/venv`)
        recompile: false,
        network: "integrated-devnet",
        wallets: {
            OpenZeppelin: {
                accountName: "OpenZeppelin",
                modulePath: "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
                accountPath: "~/.starknet_accounts"
            }
        }
    },
    networks: {
        devnet: {
            url: "http://127.0.0.1:5050"
        },
        integratedDevnet: {
            url: "http://127.0.0.1:5050",
            dockerizedVersion: "0.3.5",
            // venv: "active", // for the active virtual environment with installed starknet-devnet
            // venv: "path/to/venv", // for env with installed starknet-devnet (created with e.g. `python -m venv path/to/venv`)
            args: [
                "--seed",
                "0",
                "--gas-price",
                "1",
                "--initial-balance",
                "100000000000000000000000"
            ]
        },
        hardhat: {}
    }
};

export default config;
