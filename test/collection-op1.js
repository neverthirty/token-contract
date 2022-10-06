const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, USER_ADDRESS, OWNER_ADDRESS, TON, NFT_05DC, NFT_05DD,
} = require("./utils");

const storage = () => {
    return makeStorageCollection({});
}

const storage2 = () => {
    return makeStorageCollection({ nextItemIndex: "1502", salesCount: [ 2, 0, 0, 0, 0 ]});
}

funcer({'logVmOps': false, 'logFiftCode': false}, {
    'path': './nft/',
    'fc': FC_COLLECTION,
    'data': storage(),
    'in_msgs': [
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 40 * TON,
            "body": [
                "uint32", "1",
                "uint64", "0",
                "uint8", "0",
                "uint8", "2"
            ],
            "new_data": storage2(),
            "exit_code": 0,
            "out_msgs": [
                {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                },
                {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }
            ]
        }
    ]
});