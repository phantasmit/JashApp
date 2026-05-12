export const jobList = (userId = 0, partnerId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "jobber.plan.detail",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "jobber_plan_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "textile_ledger_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "bom_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "location_id": {
                    "fields": {}
                },
                "partner_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "partner_id_lc_method": {},
                "narration": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "start_date": {},
                "done_date": {},
                "duration": {},
                "invoice_status": {},
                "tags": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "rating": {},
                "image": {},
                "write_date": {},
                "allocated_qty": {},
                "issue_qty": {},
                "balance_qty": {},
                "state": {},
                "rate": {}
            },
            //"offset": 0,
            "order": "",
            //"limit": 80,
            "context": {
                "lang": "en_US",
                "tz": "Asia/Calcutta",
                "uid": 2,
                "allowed_company_ids": [
                    1
                ],
                "bin_size": true,
                "current_company_id": 1
            },
            "count_limit": 10001,
            //"domain": []
            "domain": [["partner_id", "=", partnerId]]
        }
    }
});