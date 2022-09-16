const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, USER_ADDRESS, OWNER_ADDRESS, TON, NFT_1387,
} = require("./utils");

const storage = () => {
    return makeStorageCollection({ salesCount: [ 3499, 0, 0, 0, 0 ], softLimits: [ 9999, 9999, 9999, 9999, 9999 ]});
}

const storage2 = () => {
    return makeStorageCollection({ nextItemIndex: "5000", salesCount: [ 3500, 0, 0, 0, 0 ], softLimits: [ 9999, 9999, 9999, 9999, 9999 ]});
}

funcer({'logVmOps': false, 'logFiftCode': false}, {
    'path': './nft/',
    'fc': FC_COLLECTION,
    'data': storage(),
    'in_msgs': [
        {
            "sender": '0:' + USER_ADDRESS,
            "amount": 40 * TON,
            "body": [],
            "new_data": storage2(),
            "exit_code": 0,
            "out_msgs": [
                {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + USER_ADDRESS,
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }, {
                    "type": "Internal",
                    "to": "0:" + USER_ADDRESS,
                    "amount": 19.9 * TON,
                    "sendMode": 3,
                    "body": [
                        "comment", "Partially sold. Change return"
                    ]
                }
            ]
        }
    ]
});