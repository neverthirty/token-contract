const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, USER_ADDRESS, OWNER_ADDRESS, TON, NFT_00E1,
} = require("./utils");

const storage = () => {
    return makeStorageCollection({ salesCount: [ 0, 0, 375, 0, 0 ]});
}

funcer({'logVmOps': false, 'logFiftCode': false}, {
    'path': './nft/',
    'fc': FC_COLLECTION,
    'data': storage(),
    'in_msgs': [
        {
            "sender": '0:' + USER_ADDRESS,
            "amount": 249 * TON,
            "body": [],
            "new_data": storage(),
            "exit_code": 0,
            "out_msgs": [
                {
                    "type": "Internal",
                    "to": "0:" + USER_ADDRESS,
                    "amount": 0,
                    "sendMode": 64,
                    "body": [
                        "comment", "Sold out"
                    ]
                }
            ]
        }
    ]
});