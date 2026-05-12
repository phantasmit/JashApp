export const productRequest = (userId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "product.template",
        "method": "web_search_read",
        "args": [],
        "kwargs": {
            "specification": {
                "product_document_count": {},
                "state": {},
                "name": {}
                // "product_variant_count": {},
                // "sale_ok": {},
                // "currency_id": {
                //     "fields": {}
                // },
                // "cost_currency_id": {
                //     "fields": {}
                // },
                // "is_favorite": {},
                // "name": {},
                // "default_code": {},
                // "responsible_id": {
                //     "fields": {
                //         "display_name": {}
                //     }
                // },
                // "product_tag_ids": {
                //     "fields": {
                //         "display_name": {}
                //     }
                // },
                // "barcode": {},
                // "list_price": {},
                // "standard_price": {},
                // "pos_categ_ids": {
                //     "fields": {
                //         "display_name": {}
                //     }
                // },
                // "available_in_pos": {},
                // "self_order_available": {},
                // "categ_id": {
                //     "fields": {
                //         "display_name": {}
                //     }
                // },
                // "type": {},
                // "show_on_hand_qty_status_button": {},
                // "qty_available": {},
                // "qty_available_not_res": {},
                // "virtual_available": {},
                // "uom_id": {
                //     "fields": {
                //         "display_name": {}
                //     }
                // },
                // "state": {},
                // "active": {},
                // "activity_exception_decoration": {},
                // "activity_exception_icon": {}
            },
            "offset": 0,
            "order": "state ASC",
            "limit": 80,
            "context": {},
            "count_limit": 10001,
            "domain": [
                [
                    "type",
                    "=",
                    "consu"
                ]
            ]
        }
    }
});