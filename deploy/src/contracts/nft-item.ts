import TonWeb from "tonweb";
import { DictBuilder, Address, Builder } from "ton";

class TonWebCell extends TonWeb["boc"]["Cell"] {}

const NFT_ITEM_CODE_HEX = "B5EE9C72410213010002EB000114FF00F4A413F4BCF2C80B0102016202030202CE0405020120111202012006070201200F1004EF0C8871C02497C0F83434C0C05C6C2497C0F83E903E900C7E800C5C75C87E800C7E800C3C00816CE38596DB088D148CB1C17CB865407E90353E900C040D3C00F801F4C7F4CFE08417F30F45148C2EA3A30C8412040DC409841140B6CF3820840BF2C9A8948C2EB8C0A0840701104A948C2EB8C08C4D8DCDE008090A0B00113E910C1C2EBCB8536001F65136C705F2E191FA4021F001FA40D20031FA00820AFAF0801CA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E821005138D91C8500ACF16500CCF1671244A145446B0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00105894102B385BE20C0080135F03333334347082108B77173504C8CBFF58CF164430128040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00011832104810371026104502DB3C0D003C82101A0B9D5116BA9E5131C705F2E19A01D4304400F003E05F06840FF2F00082028E3527F0018210D53276DB103845006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303335E25503F00301F65134C705F2E191FA4021F001FA40D20031FA00820AFAF0801CA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E8210511A4463C85008CF16500CCF1671244814544690708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00103894102B365BE20E0082028E3527F0018210D53276DB103848006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303630E25503F00300413B513434CFFE900835D27080271FC07E90353E900C040D440D380C1C165B5B5B600025013232CFD400F3C58073C5B30073C5B27B5520000DBF03A78013628C000BBC7E7F80118427BA8EC4";

class NftItem extends TonWeb["Contract"] {
    constructor(provider, options) {
        options.code = TonWebCell.oneFromBoc(NFT_ITEM_CODE_HEX);
        super(provider, options);
    }

    public createDataCell(): any {

    }
}

export { NftItem, NFT_ITEM_CODE_HEX }