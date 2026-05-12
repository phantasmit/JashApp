export const JOBSTATE = {
    'draft': { 'title': "Compute Allocation", "action": "compute_allocation", "modelName": "textile.ledger" },
    'ready_to_issue': { 'title': "Jobber Material Received", "action": "btn_material_received", "modelName": "textile.ledger" },
    'material_received': { 'title': "Production Start", "action": "btn_production_start", "modelName": "textile.ledger" },
    'production_start': { 'title': "Production End", "action": "btn_production_end", "modelName": "textile.ledger" },
    'production_end': { 'title': "Ready to Ship", "action": "btn_ready_to_ship", "modelName": "textile.ledger" },
    'ready': { 'title': "FG Receive", "action": "btn_fg_receive", "ispopUp": true, "modelName": "textile.ledger" },
    'done': { 'title': "Send All to QC", "action": "send_all_to_qc", "modelName": "order.receive" },
}

export const QC_JOBSTATE = {
    'draft': { 'title': "Send All to QC", "action": "send_all_to_qc", "modelName": "order.receive" },
    'in_qc':{ 'title': "QC Approve", "action": "set_qc_approved", "modelName": "order.receive" },
    'qc_approved':{ 'title': "Receive Goods", "action": "set_receive_goods", "modelName": "order.receive" },
}