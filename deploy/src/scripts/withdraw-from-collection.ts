import { Mnemonic, BOC, Address, Coins } from 'ton3';
import { Builder } from "ton";
import { Address as TonAddress } from 'ton';
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
    
    const dest = "EQDitfmYIQ72DuMHTsIqAV5y52t5nVKp0BWqPn_4FK52-uDK";
    const amount = 0.001;
    const payload = new Builder()
        .storeUint(0x10, 6)
        .storeAddress(TonAddress.parse(dest))
        .storeCoins(amount * 1_000_000_000)
        .storeUint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
        .storeUint(0, 32)
        .storeBuffer(Buffer.from("Admin request", "ascii"))
        .endCell();
    const body = new Builder()
        .storeUint(6, 32)
        .storeUint(0, 64)
        .storeUint(1, 8)
        .storeRef(payload)
        .endCell();

    const payments = wallet
        .createTransferMessage([{
            destination: new Address(nftCollectionContractAddress),
            amount: new Coins((0.075)),
            body: BOC.from(body.toBoc().toString("base64"))[0],
            mode: 1,
        }])
        .sign(mnemonic.keys.private)
    const paymentsBOC = BOC.toBase64Standard(payments);
    console.log();

    const result = await tonwebProvider.sendBoc(paymentsBOC);
    console.log(`Deploy success:`, result);
    console.log("Finished");
})();
