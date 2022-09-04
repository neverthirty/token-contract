const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, USER_ADDRESS, OWNER_ADDRESS, TON
} = require("./utils");

const storage = () => {
    return makeStorageCollection({});
}

const storage2 = () => {
    return makeStorageCollection({ softLimits: [ 200, 100, 100, 100, 100 ]});
}

const storage3 = () => {
    return makeStorageCollection({ softLimits: [ 1111, 2222, 3333, 4444, 5555 ]});
}

funcer({'logVmOps': false, 'logFiftCode': false}, {
    'path': './nft/',
    'fc': FC_COLLECTION,
    'data': storage(),
    'in_msgs': [ // just fill-up
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 10 * TON,
            "body": [
                "uint32", "5",
                "uint64", "0",
                "cell", [
                    'uint16', 200,
                    'uint16', 100,
                    'uint16', 100,
                    'uint16', 100,
                    'uint16', 100,
                ]
            ],
            "new_data": storage2(),
            "exit_code": 0,
            "out_msgs": []
        },
        {
            "sender": '0:' + OWNER_ADDRESS,
            "amount": 10 * TON,
            "body": [
                "uint32", "5",
                "uint64", "0",
                "cell", [
                    'uint16', 1111,
                    'uint16', 2222,
                    'uint16', 3333,
                    'uint16', 4444,
                    'uint16', 5555,
                ]
            ],
            "new_data": storage3(),
            "exit_code": 0,
            "out_msgs": []
        },
        {
            "sender": '0:' + USER_ADDRESS,
            "amount": 10 * TON,
            "body": [
                "uint32", "5",
                "uint64", "0",
                "cell", [
                    'uint16', 200,
                    'uint16', 100,
                    'uint16', 100,
                    'uint16', 100,
                    'uint16', 100,
                ]
            ],
            "exit_code": 401
        },
    ]
});