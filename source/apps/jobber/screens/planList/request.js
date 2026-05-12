export const planRequest = (userId = 0, planId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "textile.ledger",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "name": {},
                "partner_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "jobber_plan_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "jobber_plan_product_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "task_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "bom_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "date": {},
                "due_date": {},
                "fg_issue_qty": {},
                "job_color_index_line_ids": {},
                "state": {},
                "partner_id_rate": {},
                "total_amount": {}
            },
            "domain": [
                [
                    "jobber_plan_id",
                    "=",
                    planId
                ]
            ]
        }
    }
});