export const jobFormDataRequest = (userId = 0, formId = 0) => ({
    "id": userId,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "model": "textile.ledger",
        "method": "web_read",
        "args": [[formId]],
        "kwargs": {
            "specification": {
                "is_checked_account_stock": {},
                "state": {},
                "fg_receive_count": {},
                "active_jobber_count": {},
                "active_plan_count": {},
                "bom_count": {},
                "stock_move_ids": {},
                "name": {},
                "bom_partner_ids": {},
                "partner_ids": {},
                "partner_id": {
                    "fields": {
                        "display_name": {}
                    },
                    "context": {
                        "default_jobber": 1,
                        "default_supplier": 1,
                        "search_default_jobber": 1
                    }
                },
                "partner_id_lc_method": {},
                "partner_id_rate": {},
                "narration": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "start_date": {},
                "done_date": {},
                "duration": {},
                "production_capacity_per_day": {},
                "working_hour_per_day": {},
                "production_capacity_per_hour": {},
                "next_job_issue_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "task_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "date": {},
                "due_date": {},
                "jobber_plan_id": {
                    "fields": {}
                },
                "tags": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "rating": {},
                "image": {},
                "write_date": {},
                "done": {},
                "invoice_status": {},
                "currency_id": {
                    "fields": {}
                },
                "send_boolean": {},
                "receive_bal": {},
                "id": {},
                "invoice_id": {
                    "fields": {
                        "display_name": {}
                    }
                },
                "jobber_plan_detail_id": {
                    "fields": {
                        "jobber_plan_id": {
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
                        "partner_id": {
                            "fields": {}
                        },
                        "location_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "finished_goods_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "rate": {},
                        "labour_charges": {},
                        "actual_receive_qty": {},
                        "extra_charges": {},
                        "allocated_qty": {},
                        "issue_qty": {},
                        "balance_qty": {},
                        "receive_qty": {},
                        "receive_bal": {},
                        "state": {}
                    }
                },
                "jobber_allocation_detail_ids": {
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
                        "comp_qty": {},
                        "lots_visible": {},
                        "uom_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "req_qty": {},
                        "allocation_qty": {},
                        "req_allocation_bal": {},
                        "stock_qty": {},
                        "textile_ledger_id": {
                            "fields": {}
                        },
                        "sent": {},
                        "qty_done": {},
                        "sent_qty": {},
                        "access_bal": {},
                        "location_id": {
                            "fields": {}
                        }
                    }
                },
                "order_receive_line_ids": {
                    "fields": {
                        "date": {},
                        "order_rec_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "qty": {},
                        "receive_qty": {},
                        "image_receive": {},
                        "write_date": {}
                    }
                },
                "job_color_index_line_ids": {
                    "fields": {
                        "is_bom_primary": {},
                        "is_windo_open": {},
                        "bom_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "color_index_reference": {},
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
                        "production_qty": {},
                        "final_piece_qty": {},
                        "average_qty": {},
                        "qty_onhand": {},
                        "req_quantity": {},
                        "issued_qty": {},
                        "balance": {},
                        "textile_ledger_id": {
                            "fields": {}
                        }
                    },
                    "order": "product_color_index_number ASC"
                },
                "qc_para_process_line_ids": {
                    "fields": {
                        "bom_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "attachment_id": {},
                        "write_date": {},
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
                        "attribute_value": {},
                        "approved": {},
                        "textile_ledger_id": {
                            "fields": {}
                        }
                    }
                },
                "bom_image_ids": {
                    "fields": {
                        "name": {},
                        "mimetype": {}
                    }
                },
                "bom_image_id": {},
                "bom_production_rules_ids": {
                    "fields": {
                        "product_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "color_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "price_range": {},
                        "condition": {},
                        "rm_value": {},
                        "add_less": {},
                        "value": {},
                        "type_count": {},
                        "round_off": {},
                        "lc_apply": {},
                        "labour_method": {},
                        "labour_charges": {},
                        "jobber_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "source_location_id": {
                            "fields": {
                                "display_name": {}
                            }
                        },
                        "dest_location_id": {
                            "fields": {
                                "display_name": {}
                            }
                        }
                    }
                },
                "user_id": {
                    "fields": {}
                },
                "display_name": {}
            }
        }
    }
});

export const jobFormDataRequestOLD = (userId = 0, formId = 0) => ({
    "jsonrpc": "2.0",
    "method": "call",
    "id": userId,
    "params": {
        "model": "textile.ledger",
        "method": "read",
        "args": [[formId]],
        "kwargs": {},
        "context": {
            "lang": "en_US",
            "tz": "Europe/Brussels",
            "uid": 1
        }
    }
});

export const jobFormKeyMapping = {
    display_name: "Job Name",
    jobber_plan_id: "Job Plan",
    partner_id: "Partner Name",
    date: "Date",
    start_date: "Production Start Date",
    done_date: "Production Done Date",
    duration: "Duration",
    state: "State"
};

export const colorIndexKeyMapping = {
    bom_id: "Process",
    product_id: "Product",
    color_tag_id: "Color Tag",
    production_qty: "Production Quantity",
    final_piece_qty: "Final Pcs Qty"
};

export const getLineDataRequest = (userId = 0, lineID = 0) => ({
    "jsonrpc": "2.0",
    "method": "call",
    "id": userId,
    "params": {
        "model": "color.index.report.line",
        "method": "read",
        "args": [lineID],
        "kwargs": {},
        "context": {
            "lang": "en_US",
            "tz": "Europe/Brussels",
            "uid": 1
        }
    }
});


export const getFGReceiveRequest = (userId = 0, fgReceiveId = 0) => (
    {
        "jsonrpc": "2.0",
        "method": "call",
        "id": userId,
        "params": {
            "model": "order.receive",
            "method": 'web_read',
            "args": [[fgReceiveId]],
            "kwargs": {
                "specification": {
                    "order_receive_color_index_ids": {
                        "fields": {
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
                            "final_piece_qty": {},
                            "receive_qty": {}
                        }
                    }
                }
            }
        }
    })


export const updateQtyRequestData = (userId = 0, fgReceiveId = 0, productData = []) => (
    {
        "id": userId,
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
            "model": "order.receive",
            "method": "write",
            "args": [
                [
                    fgReceiveId
                ],
                {
                    "order_receive_color_index_ids": productData
                }
            ],
            "kwargs": {}
        }
    }
)
export const updateActionReceiveRequestData = (userId = 0, fgReceiveId = 0) => (
    {
        "jsonrpc": "2.0",
        "method": "call",
        "id": userId,
        "params": {
            "model": 'order.receive',
            "method": "action_receive",
            "args": [[fgReceiveId]],
            "kwargs": {}
        }
    })