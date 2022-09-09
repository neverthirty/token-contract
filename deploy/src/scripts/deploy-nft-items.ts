import TonWeb from "tonweb";
import { Mnemonic, BOC, Address, Coins, Builder} from 'ton3';
import { NftCollection } from "../contracts/nft-collection";
import { Utils } from "../utils/utils"

const tonwebProvider = Utils.getProvider();

(async () => {
    const mnemonic = new Mnemonic(Utils.getMnemonic());

    const wallet = Utils.getHighloadWallet();
    const walletAddress = wallet.address.toString();

    const nftCollectionContract = new NftCollection(tonwebProvider, {
        ownerAddress: walletAddress,
        royaltyAddress: walletAddress,
        royalty: 0.05,  // 5%
        collectionContentUri: Utils.collectionContentUri,
        nftItemContentBaseUri: Utils.nftItemContentBaseUri,
    })
    const nftCollectionContractAddress = (await nftCollectionContract.getAddress()).toString(true, true, false, false);

    console.log("Wallet Contract Address is:", walletAddress);
    console.log("NFT Collection Address is: ", nftCollectionContractAddress);
    
    const transfers = [];
    const maxTransactionsCount = 250;
    const typesCount = [
        1,  // Standart
        1,
        1,
        1,
        1,  // Black
    ];

    for (let typeId = 0; typeId < 5; typeId++) {
        let typeCount = typesCount[typeId];
        while (typeCount > 0) {
            const deployCount = Math.min(typeCount, maxTransactionsCount);
            typeCount -= deployCount;
            console.log("Add transfer. Type:", typeId, "Count:", deployCount);
            transfers.push({
                destination: new Address(nftCollectionContractAddress),
                amount: new Coins((0.11 * deployCount)),
                body: BOC.from(await (await nftCollectionContract.createAdminDeployRequestBody(typeId, deployCount)).toBoc())[0],
                mode: 1,
            });
        }
    }


    const payments = wallet
        .createTransferMessage(transfers)
        .sign(mnemonic.keys.private)
    const paymentsBOC = BOC.toBase64Standard(payments);
    console.log();

    const result = await tonwebProvider.sendBoc(paymentsBOC);
    console.log(`Deploy success:`, result);
    console.log("Finished");
})();
