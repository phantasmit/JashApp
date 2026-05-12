export const productDetailRequest = (userId = 0, prodctId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "product.template",
        "method": "web_read",
        "args": [[prodctId]],
        "kwargs": {
            "context": {},
            "specification": {
                "state": {},
                "l10n_in_hsn_warning": {},
                "product_variant_count": {},
                "service_type": {},
                "visible_expense_policy": {},
                "is_kits": {},
                "is_product_variant": {},
                "attribute_line_ids": {},
                "company_id": {
                    "fields": {}
                },
                "fiscal_country_codes": {},
                "pricelist_item_count": {},
                "tracking": {},
                "show_on_hand_qty_status_button": {},
                "show_forecasted_qty_status_button": {},
                "qty_available": {},
                "uom_name": {},
                "virtual_available": {},
                "bom_count": {},
                "product_document_count": {},
                "sales_count": {},
                "purchased_product_qty": {},
                "used_in_bom_count": {},
                "mrp_product_qty": {},
                "reordering_min_qty": {},
                "reordering_max_qty": {},
                "nbr_reordering_rules": {},
                "nbr_moves_in": {},
                "nbr_moves_out": {},
                "master_plan_count": {},
                "product_qty": {},
                "qty_available_not_res": {},
                "schedule_count": {},
                "id": {},
                "image_1920": {},
                "write_date": {},
                "is_favorite": {},
                "name": {},
                "sale_ok": {},
                "purchase_ok": {},
                "recurring_invoice": {},
                "can_be_expensed": {},
                "available_in_pos": {},
                "is_active_for_overhead_cost": {},
                "is_active_for_checking_lot": {},
                "active": {},
                "type": {},
                "invoice_policy": {},
                "additional_field_one": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "additional_field_two": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "additional_field_three": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "tags": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "is_storable": {},
                "combo_ids": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "service_tracking": {},
                "project_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "default_allow_billable": true
                    }
                },
                "project_template_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "active_test": false,
                        "default_allow_billable": true
                    }
                },
                "service_policy": {},
                "product_tooltip": {},
                "planning_enabled": {},
                "planning_role_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "form_view_ref": "sale_planning.sale_planning_role_view_form"
                    }
                },
                "lot_valuated": {},
                "list_price": {},
                "uom_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "taxes_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "default_type_tax_use": "sale",
                        "search_default_sale": 1
                    }
                },
                "tax_string": {},
                "standard_price": {},
                "cost_method": {},
                "valuation": {},
                "supplier_taxes_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "default_type_tax_use": "purchase",
                        "search_default_purchase": 1
                    }
                },
                "categ_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "default_code": {},
                "valid_product_template_attribute_line_ids": {},
                "barcode": {},
                "l10n_in_hsn_code": {},
                "currency_id": {
                    "fields": {}
                },
                "cost_currency_id": {
                    "fields": {}
                },
                "product_variant_id": {
                    "fields": {}
                },
                "product_properties": {},
                "description": {},
                "optional_product_ids": {
                    "fields": {
                        "display_name": {},
                        "color": {}
                    },
                    "context": {
                        "search_product_product": true
                    }
                },
                "product_tag_ids": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "description_sale": {},
                "expense_policy": {},
                "color": {},
                "to_weight": {},
                "pos_categ_ids": {
                    "fields": {
                        "display_name": {},
                        "color": {}
                    }
                },
                "self_order_available": {},
                "public_description": {},
                "product_subscription_pricing_ids": {
                    "fields": {
                        "plan_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "pricelist_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "currency_id": {
                            "fields": {}
                        },
                        "price": {}
                    },
                    "limit": 40,
                    "order": ""
                },
                "seller_ids": {
                    "fields": {
                        "sequence": {},
                        "partner_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_tmpl_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_name": {},
                        "product_code": {},
                        "date_start": {},
                        "date_end": {},
                        "min_qty": {},
                        "product_uom": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "price": {},
                        "discount": {},
                        "delay": {},
                        "state": {},
                        "company_id": {
                            "fields": {}
                        }
                    },
                    "context": {
                        "product_template_invisible_variant": true,
                        "list_view_ref": "purchase.product_supplierinfo_tree_view2"
                    },
                    "limit": 40,
                    "order": "sequence ASC, id ASC"
                },
                "variant_seller_ids": {
                    "fields": {
                        "sequence": {},
                        "partner_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_tmpl_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_name": {},
                        "product_code": {},
                        "date_start": {},
                        "date_end": {},
                        "min_qty": {},
                        "product_uom": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "price": {},
                        "discount": {},
                        "delay": {},
                        "company_id": {
                            "fields": {}
                        }
                    },
                    "context": {
                        "model": "product.template",
                        "list_view_ref": "purchase.product_supplierinfo_tree_view2"
                    },
                    "limit": 40,
                    "order": "sequence ASC, id ASC"
                },
                "service_to_purchase": {},
                "uom_po_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "landed_cost_ok": {},
                "split_method_landed_cost": {},
                "purchase_method": {},
                "description_purchase": {},
                "has_available_route_ids": {},
                "route_ids": {
                    "fields": {}
                },
                "route_from_categ_ids": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "min_qty": {},
                "default_color_tag_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "responsible_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "weight": {},
                "weight_uom_name": {},
                "volume": {},
                "volume_uom_name": {},
                "sale_delay": {},
                "hs_code": {},
                "country_of_origin": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "use_expiration_date": {},
                "property_stock_production": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "property_stock_inventory": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "expiration_time": {},
                "use_time": {},
                "removal_time": {},
                "alert_time": {},
                "description_pickingin": {},
                "description_pickingout": {},
                "description_picking": {},
                "property_account_income_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "property_account_expense_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "property_account_creditor_price_difference": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "stock_lot_cost_config_ids": {
                    "fields": {
                        "product_id": {
                            "fields": {}
                        },
                        "lot_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "cost_per_unit": {},
                        "lot_type": {},
                        "state": {}
                    },
                    "limit": 40,
                    "order": ""
                },
                "uom_category_id": {
                    "fields": {}
                },
                "display_name": {}
            }
        }
    }
});

export const threadRequest = (userId = 0, prodctId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "request_list": [
            "activities",
            "attachments",
            "followers",
            "scheduledMessages",
            "suggestedRecipients"
        ],
        "thread_id": prodctId,
        "thread_model": "product.template"
    }
});