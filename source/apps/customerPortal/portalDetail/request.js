export const customerPortalDetailReq = (userId = 0, portalId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "customer.portal",
        "method": "web_read",
        "args": [[portalId]],
        "kwargs": {
            "context": {},
            "specification": {
                "name": {},
                "mode_type_selection": {},
                "partner_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "x_studio_top": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "x_studio_dupatta": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "x_studio_bottom": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "x_studio_mobile": {},
                "product_template_id": {
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
                "product_website_url": {},
                "media_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "type_selection": {},
                "image_multiple": {
                    "fields": {
                        "name": {},
                        "mimetype": {}
                    }
                },
                "category_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "line_ids": {
                    "fields": {
                        "product_template_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "x_studio_top": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "x_studio_bottom": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "x_studio_dupatta": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "price_unit": {},
                        "write_date": {},
                        "image_url": {}
                    },
                    "order": ""
                },
                "customer_line_ids": {
                    "fields": {
                        "partner_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "x_studio_mobile": {},
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "write_date": {},
                        "price_unit": {},
                        "image_url": {},
                    },
                    "order": ""
                },
                "scheduled_datetime": {},
                "display_name": {}
            }
        }
    }
});