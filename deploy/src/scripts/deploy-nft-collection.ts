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

    const transfers = [{
        destination: new Address(nftCollectionContractAddress),
        amount: new Coins('0.075'),
        body: new Builder().cell(),
        mode: 3,
        init: BOC.from(await (await nftCollectionContract.createStateInit()).stateInit.toBoc(false))[0]
    }]

    const payments = wallet
        .createTransferMessage(transfers)
        .sign(mnemonic.keys.private)
    const paymentsBOC = BOC.toBase64Standard(payments);
    
    const result = await tonwebProvider.sendBoc(paymentsBOC);
    console.log(result);
})();
