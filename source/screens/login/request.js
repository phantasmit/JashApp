export const userProcess = (userId = 0, partnerId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "res.partner",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "code_ids": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "qc_code_ids": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "is_qc_approver": {},
                "jobber": {}
            },
            "domain": [["id", "=", partnerId]]
        }
    }
});