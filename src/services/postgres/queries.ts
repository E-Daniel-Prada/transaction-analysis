export const getAggregated = `
    SELECT * FROM aggregated_transactions;
`;

export const getfailedtransactions = `
    SELECT * FROM failed_transactions;
`;

export const getSummary = `
    SELECT * FROM transactions_summary;
`;

export const getInconsistency_aggregated_transactions = `
    SELECT * FROM inconsistency_aggregated_transactions;
`;