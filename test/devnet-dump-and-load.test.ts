import { expect } from "chai";
import { starknet } from "hardhat";
import { TIMEOUT } from "./constants";
import { ensureEnvVar } from "./util";

describe("Devnet Dump and Load", function () {
    this.timeout(TIMEOUT);

    const dumpPath = "dump.pkl";

    it("Should persist devnet instance after dump and restart", async function () {
        const account = await starknet.getAccountFromAddress(
            ensureEnvVar("OZ_ACCOUNT_ADDRESS"),
            ensureEnvVar("OZ_ACCOUNT_PRIVATE_KEY"),
            "OpenZeppelin"
        );

        const contractFactory = await starknet.getContractFactory("contract");
        const contract = await contractFactory.deploy({ initial_balance: 0 });

        await account.invoke(contract, "increase_balance", { amount1: 10, amount2: 20 });
        const { res: balanceBeforeDump } = await contract.call("get_balance");
        expect(balanceBeforeDump).to.deep.equal(30n);

        // Dump and restart
        await starknet.devnet.dump(dumpPath);

        await starknet.devnet.restart();

        // Load from dump
        await starknet.devnet.load(dumpPath);

        await account.invoke(contract, "increase_balance", { amount1: 10, amount2: 20 });
        const { res: balanceAfterDumpAndLoad } = await contract.call("get_balance");
        expect(balanceAfterDumpAndLoad).to.deep.equal(60n);
    });
});
