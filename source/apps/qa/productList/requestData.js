// export const productList = (userId = 0, domainData = []) => ({
//     "id": userId,
//     "jsonrpc": "2.0",
//     "method": "call",
//     "params": {
//         "model": "order.receive",
//         "method": "web_search_read",
//         "args": [],
//         "kwargs": {
//             "domain": domainData,
//             "order": "date desc",//desc ASC
//             "specification": {
//                 "date": {},
//                 "code": {},
//                 "jobber_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "plan_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "job_issue_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "current_process_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "next_mrp_bom_process_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "next_job_issue_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "total_received_qty": {},
//                 "total_amount": {},
//                 "state": {}
//                 //"receive_order_line": {}
//             },
//         }
//     }
// });

// export const productList = (userId = 0, domainData = [], offsetVal = 0, limitVal = 30) => ({
//     "id": userId,
//     "jsonrpc": "2.0",
//     "method": "call",
//     "params": {
//         "model": "order.receive",
//         "method": "web_search_read",
//         "args": [],
//         "kwargs": {
//             "specification": {
//                 "date": {},
//                 "code": {},
//                 "jobber_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "plan_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "job_issue_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "current_process_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "next_mrp_bom_process_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "next_job_issue_id": {
//                     "fields": {
//                         "display_name": {}
//                     }
//                 },
//                 "total_received_qty": {},
//                 "total_amount": {},
//                 "state": {}
//             },
//             "offset": offsetVal,
//             "order": "date desc",
//             "limit": limitVal,
//             "context": {},
//             //"count_limit": 10001,
//             "domain": domainData
//             //"domain": [["jobber_id","=",9399]]
//             //"domain": [["state","!=",["done","reject","cancelled"]]]
//         }
//     }
// });

export const productList = (userId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "order.receive",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "date": {},
                "code": {},
                "jobber_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "plan_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "job_issue_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "current_process_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "next_mrp_bom_process_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "total_received_qty": {},
                "state": {}
            },
            "offset": 0,
            "order": "",
            "context": {},
            "domain": [
                "|",
                "|",
                [
                    "state",
                    "=",
                    "qc_approved"
                ],
                [
                    "state",
                    "=",
                    "in_qc"
                ],
                [
                    "state",
                    "=",
                    "draft"
                ]
            ]
        }
    }
});