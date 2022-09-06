const {funcer} = require("./funcer");
const {
    makeStorageCollection, FC_COLLECTION, OWNER_ADDRESS, TON
} = require("./utils");

const storage = () => {
    return makeStorageCollection({});
}

const storage2 = () => {
    return makeStorageCollection({ softLimits: [ 200, 100, 100, 100, 100 ]});
}

funcer({'logVmOps': false, 'logFiftCode': false}, {
    'path': './nft/',
    'fc': FC_COLLECTION,
    'data': storage2(),
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
    ],
    "get_methods": [
        {
            "name": "get_nft_content",
            "args": [
                ["int", "0"],
                ["cell", [
                    "string", "test"
                ]]
            ],
            "output": [
                ["cell", [
                    'uint8', 1,
                    "string", "https://ton.org/meta/0000.json"
                ]]
            ]
        },
        {
            "name": "get_nft_content",
            "args": [
                ["int", "254"],
                ["cell", []]
            ],
            "output": [
                ["cell", [
                    'uint8', 1,
                    "string", "https://ton.org/meta/00FE.json"
                ]]
            ]
        },
        {
            "name": "get_nft_type_sales_info",
            "args": [
                ['int', '0']
            ],
            "output": [
                ["int", 1500],
                ["int", 3500],
                ["int", 200],
                ["int", 0],
            ]
        },
        {
            "name": "get_nft_type_sales_info",
            "args": [
                ['int', '1']
            ],
            "output": [
                ["int", 500],
                ["int", 1000],
                ["int", 100],
                ["int", 0],
            ]
        },
        {
            "name": "get_nft_type_sales_info",
            "args": [
                ['int', '2']
            ],
            "output": [
                ["int", 125],
                ["int", 375],
                ["int", 100],
                ["int", 0],
            ]
        },
        {
            "name": "get_nft_type_sales_info",
            "args": [
                ['int', '3']
            ],
            "output": [
                ["int", 25],
                ["int", 100],
                ["int", 100],
                ["int", 0],
            ]
        },
        {
            "name": "get_nft_type_sales_info",
            "args": [
                ['int', '4']
            ],
            "output": [
                ["int", 0],
                ["int", 25],
                ["int", 100],
                ["int", 0],
            ]
        }
    ],
    
});