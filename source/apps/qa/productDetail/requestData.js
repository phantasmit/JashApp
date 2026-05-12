export const jobFormRequest = (userId = 0, formId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "order.receive",
        "method": "web_read",
        "args": [[formId]],
        "kwargs": {
            "context": {
                "lang": "en_US",
                "tz": "Asia/Calcutta",
                "uid": 2,
                "allowed_company_ids": [
                    1
                ],
                "bin_size": true,
                "params": {}
            },
            "specification": {
                "state": {},
                "done": {},
                "pending_sales_qty": {},
                "stock_move_ids": {},
                "code": {},
                "jobber_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "default_jobber": 1,
                        "default_supplier": 1,
                        "search_default_jobber": 1
                    }
                },
                "next_mrp_bom_process_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "next_job_issue_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "date": {},
                "due_date": {},
                "job_issue_id": {
                    "fields": {}
                },
                "plan_id": {
                    "fields": {}
                },
                "tags": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "rating": {},
                "image_id": {},
                "write_date": {},
                "rec_bool": {},
                "receive_order_line": {
                    "fields": {
                        "job_issue_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "plan_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "bom_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "image_receive": {},
                        "rate": {},
                        "qty": {},
                        "receive_qty": {},
                        "scrap_qty": {},
                        "sent_qty": {},
                        "balance_qty": {},
                        "remarks": {},
                        "extra_charges": {},
                        "total_amount": {},
                        "jobber_id": {
                            "fields": {}
                        },
                        "temp_bool": {},
                        "state": {}
                    },
                    "order": ""
                },
                "qc_para_process_line_ids": {
                    "fields": {
                        "bom_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "type_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "attribute_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "attachment_id": {},
                        "write_date": {},
                        "attribute_value": {},
                        "user_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "approved": {},
                        "order_receive_id": {
                            "fields": {}
                        }
                    },
                    "order": ""
                },
                "allocation_line": {
                    "fields": {
                        "jobber_plan_ids": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "reference": {},
                        "req_qty": {},
                        "sent_qty": {},
                        "access_bal": {}
                    },
                    "order": ""
                },
                "order_receive_color_index_ids": {
                    "fields": {
                        "product_color_index_number": {},
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "color_tag_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "receive_qty": {},
                        "attachment_id": {},
                        "write_date": {}
                    },
                    "order": ""
                },
                "display_name": {}
            }
        }
    }
});

export const buttonActionRequest = (userId = 0, methodName = "", formId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "order.receive",
        "method": methodName,
        "args": [[formId]],
        "kwargs": {},
        "context": {
            "lang": "en_US",
            "tz": "Europe/Brussels",
            "uid": 1
        }
    }
});


export const checkBoxActionRequest = (userId = 0, formId = 0, qc_param_id = 0, isApproved = false) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "order.receive",
        "method": "web_save",
        "args": [[formId],
        {
            "qc_para_process_line_ids": [[1, qc_param_id,
                {
                    "approved": isApproved
                }
            ]]
        }],
        "kwargs": {
            "context": {
                "lang": "en_US",
                "tz": "Asia/Calcutta",
                "uid": userId
            },
            "specification": {}
        }
    }
});