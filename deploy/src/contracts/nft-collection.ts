import TonWeb from "tonweb";
import { DictBuilder, Address, Builder, Cell } from "ton";
import { NFT_ITEM_CODE_HEX } from "./nft-item";

class TonWebCell extends TonWeb["boc"]["Cell"] {}

const NFT_COLLECTION_CODE_HEX = "B5EE9C72410224010004A0000114FF00F4A413F4BCF2C80B0102016202030202CB04050201201C1D020120060701E5D08B414C0BC00D4C82EE385C41E57C2405C22E14DBDB19081BDD5D220103C03DC1480B814AAB1C1644C24AD823889E85400ED8220403EAD820830406388C41197C1805C234134D696E74696E67206973206F6E207061757365820103C03DC1480B80D14456808E2B90D0D544C68110C3C0104A1B020120080902012015160201200A0B020120111203F7401D0D3030171B0925F03E0FA403021C70091709401D31F59E222C70091709502D33F5033E2ED44D0FA40D33FD4D4D4D4308210693D39505280BA8E2B155F0532333302D08210A8CB00AD708010C8CB055005CF1624FA0214CB6A13CB1FCB3F01CF16C98040FB00E03626C000E302395363C705F2E19125C001E30280C0D0E0201200F1000F8363707F00227544530544A8028F0105326B923C300B08E475062A158A882103B9ACA00A8821005F5E100A120821005F5E100BC8E24168D0754185C9D1A585B1B1E481CDBDB190B8810DA185B99D9481C995D1D5C9BA073F00F923035E210249336375BE25004B60910354444C85006CF1614CB3F12CCCCCCCCC9ED5400543506D307D307302310475136463306F0103212B6091035045033C85006CF1614CB3F12CCCCCCCCC9ED5400F43624C0038E1A323304FA403044154300C85006CF1614CB3F12CCCCCCCCC9ED54E024C0048E1A30333503D4D430440302C85006CF1614CB3F12CCCCCCCCC9ED54E024C0058E1D3402D005D74CD015F005144350C85006CF1614CB3F12CCCCCCCCC9ED54E010455F056C12C00697D307D74C01FB00E030840FF2F000F70820840EE6B2802A4230002620840EE6B2802A4124FCB03238882042EDEA423000266042EDDD14486A4104B8082040F9EA423000266040F9DCD4486A4104B80820403E6A4230002660403E5C94486A4104B808200C6A42300026200C5C54486A4104B80820052A4230002620051C14486A4104B80C3CB0321C1FC82000471C086A80C4F5C874C3DD08E865B4C3D4112800F900AA80C4B5C874C3E01035C874C3CC2002012013140045570218E1B5CA1A5AA015230AD800FB020C10A92A63092A637E25004CB0703A4E45F038004B00B5A7C8AA80F5C6200435C85D540128696A80C4F5C60C321633C59633C584B2C3C073C5B2600043201400B593C8F5C84CC0B593CC0875D270143CB865B21400F3C58073C58073C5B260002DF00E4659FFC14678B64B81064658089FA007A00658064C0201201718020120191A0039570208010C8CB055006CF165004FA0214CB6A12CB1F01CF16C901FB008001B3E401D3232C084B281F2FFF27420003D16BC02DC087C031DE0063232C15633C594013E8084F2DAC4B333325C7EC020002A821004C4B400C8C9C829CF16CCC922544730F00DA40201201E1F0201202223005DB8B5D30ED44D0FA40D33FD4D4D4D43010355F05D0D431D430D071C8CB0701CF160174F0078B52E6A736F6E8CF16C9802012020210033B5DAFDA89A1F481A67FA9A9A9A8602ABE0BA1A61FA61FF4806100031B4F47DA89A1F481A67FA9A9A9A860204ABE0BE016E003E01900029B905BED44D0FA40D33FD4D4D4D4305F03D0D4305880029BB5F5ED44D0FA40D33FD4D4D4D4306C51D001F00387316DD84";

class NftCollection extends TonWeb["Contract"] {
    constructor(provider, options: any) {
        options.code = TonWebCell.oneFromBoc(NFT_COLLECTION_CODE_HEX);

        if (options.royalty > 1) throw new Error('royalty > 1');
        options.royaltyBase = 1000;
        options.royaltyFactor = Math.floor(options.royalty * options.royaltyBase);

        super(provider, options);
    }

    public createDataCell(): any {
        const b = new Builder();
        b.storeAddress(Address.parse((this.options as any).ownerAddress));  // owner address
        b.storeUint(0, 64);                                                 // next item index

        b.storeRef(this.createContentCell(this.options));                   // content cell
        b.storeRef(Cell.fromBoc(Buffer.from(NFT_ITEM_CODE_HEX, "hex"))[0]); // nft code cell
        b.storeRef(this.createRoyaltyCell());                               // royalty cell
        b.storeRef(this.createSalesInfoCell());                             // sales info cell
        
        return TonWebCell.fromBoc(b.endCell().toBoc().toString("hex"))[0];
    }

    public createAdminDeployRequestBody(type: number, count: number): any {
        const b = new Builder();
        b.storeUint(1, 32);
        b.storeUint(0, 64);
        b.storeUint(type, 8);
        b.storeUint(count, 8);

        return TonWebCell.fromBoc(b.endCell().toBoc().toString("hex"))[0];
    }

    private createSalesInfoCell(): Cell {
        const salesInfoCell = new Builder();

        salesInfoCell.storeUint(3500, 16);
        salesInfoCell.storeUint(1000, 16);
        salesInfoCell.storeUint(375, 16);
        salesInfoCell.storeUint(100, 16);
        salesInfoCell.storeUint(25, 16);

        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);

        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);
        salesInfoCell.storeUint(0, 16);

        return salesInfoCell.endCell();
    }

    private createRoyaltyCell(): Cell {
        const royaltyCell = new Builder();
        royaltyCell.storeUint((this.options as any).royaltyFactor, 16);
        royaltyCell.storeUint((this.options as any).royaltyBase, 16);
        royaltyCell.storeAddress(Address.parse((this.options as any).ownerAddress));
        return royaltyCell.endCell();
    }

    private createContentCell(params: any): Cell {
        const contentCell = new Builder();
        contentCell.storeRef(new Builder().storeUint(1, 8).storeBuffer(Buffer.from(params.collectionContentUri, "ascii")).endCell());
        contentCell.storeRef(new Builder().storeBuffer(Buffer.from(params.nftItemContentBaseUri, "ascii")).endCell());
        return contentCell.endCell();
    }
}

export { NftCollection, NFT_COLLECTION_CODE_HEX }