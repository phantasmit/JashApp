export const getCustomerPortalData = (userId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "customer.portal",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "name": {},
                "mode_type_selection": {},
                "partner_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "product_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "pricelist_option": {},
                "type_selection": {},
                "scheduled_datetime": {}
            },
            "domain": []
        }
    }
});