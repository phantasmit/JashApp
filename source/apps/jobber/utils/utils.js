export const groupByInvoice = (data) => {
    return data.reduce((acc, item) => {
        const key = item.invoice_status || 'unknown';
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};


export const groupByState = (data) => {
    return data.reduce((acc, item) => {
        const key = item.state || 'unknown';
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};


export const groupByPartnerId = (data) => {
    const grouped = {};
    data.forEach((item) => {
        const key = item.partner_id?.display_name || 'Unknown Partner';
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(item);
    });
    return grouped;
};



export const containsDisplayNameWith = (obj, letter) => {
    for (const value of Object.values(obj)) {
        if (
            value &&
            typeof value === 'object' &&
            'display_name' in value &&
            typeof value.display_name === 'string' &&
            value.display_name.toLowerCase().includes(letter.toLowerCase())
        ) {
            return true;
        }
    }
    return false;
};

export const formatValue = (value) => {
    if (Array.isArray(value)) {
        if (value.length === 2) return value[1];
        return value.join(" , ");
    }
    if (typeof value === "boolean") {
        return value ? "Yes" : "No"; // handle booleans nicely
    }
    if (value === null || value === undefined) {
        return "-"; // show dash for empty values
    }
    return String(value); // fallback
};
