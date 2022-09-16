const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, USER_ADDRESS, OWNER_ADDRESS, TON, NFT_00E1,
} = require("./utils");

const storage = () => {
    return makeStorageCollection({ salesCount: [ 0, 0, 373, 0, 0 ], softLimits: [ 0, 0, 0, 0, 0 ]});
}

const storage2 = () => {
    return makeStorageCollection({ nextItemIndex: 125 + 375, salesCount: [ 0, 0, 375, 0, 0 ], softLimits: [ 0, 0, 0, 0, 0 ]});
}

const storage3 = () => {
    return makeStorageCollection({ nextItemIndex: 125 + 374, salesCount: [ 0, 0, 374, 0, 0 ], softLimits: [ 0, 0, 0, 0, 0 ]});
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
                        "comment", "Minting is on pause"
                    ]
                }
            ]
        },
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 249 * TON,
            "body": [],
            "new_data": storage3(),
            "exit_code": 0,
            "out_msgs": [
                {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + OWNER_ADDRESS,
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }
            ]
        },
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 249 * 3 * TON,
            "body": [],
            "new_data": storage2(),
            "exit_code": 0,
            "out_msgs": [
                {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + OWNER_ADDRESS,
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }, {
                    "type": "Internal",
                    "amount": 0.08 * TON,
                    "sendMode": 1,
                    "body": [
                        "Address", '0:' + OWNER_ADDRESS,
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }, {
                    "type": "Internal",
                    "to": "0:" + OWNER_ADDRESS,
                    "amount": 248.9 * TON,
                    "sendMode": 3,
                    "body": [
                        "comment", "Partially sold. Change return"
                    ]
                }
            ]
        },
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 249 * TON,
            "body": [
                "uint32", "1",
                "uint64", "0",
                "uint8", "2",
                "uint8", "3"
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
                        "Address", '0:' + OWNER_ADDRESS,
                        "cell", [],
                    ],
                }
            ]
        }
    ]
});