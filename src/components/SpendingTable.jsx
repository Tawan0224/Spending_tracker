const categoryIcons = {
    'Groceries': 'fa-solid fa-cart-shopping',
    'Dining Out': 'fa-solid fa-bowl-rice',
    'Transportation': 'fa-solid fa-bus',
    'Utilities': 'fa-solid fa-screwdriver-wrench',
    'Entertainment': 'fa-solid fa-tv',
    'Health': 'fa-solid fa-book-medical',
    'Shopping': 'fa-solid fa-bag-shopping',
    'Travel': 'fa-solid fa-plane',
    'Education': 'fa-solid fa-graduation-cap',
    'Miscellaneous': 'fa-solid fa-ellipsis-vertical',
}

export default function SpendingTable({ spendingData }) {
    const handleRowClick = (spendingId) => {
        // Replace with your navigation logic
        console.log(`Navigate to /journal/${spendingId}`);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h5 className="card-title mb-0">
                                    <i className="fa-solid fa-receipt me-2"></i>
                                    Spending Records
                                </h5>
                            </div>
                            <div className="card-body p-0">
                                {spendingData && spendingData.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col" width="10%">
                                                        <i className="fa-solid fa-tag me-1"></i>
                                                        Category
                                                    </th>
                                                    <th scope="col" width="40%">
                                                        <i className="fa-solid fa-file-text me-1"></i>
                                                        Description
                                                    </th>
                                                    <th scope="col" width="15%" className="text-end">
                                                        <i className="fa-solid fa-dollar-sign me-1"></i>
                                                        Amount
                                                    </th>
                                                    <th scope="col" width="20%">
                                                        <i className="fa-solid fa-calendar me-1"></i>
                                                        Date
                                                    </th>
                                                    <th scope="col" width="15%" className="text-center">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {spendingData.map((spending) => (
                                                    <tr 
                                                        key={spending.spending_id}
                                                        className="cursor-pointer"
                                                        onClick={() => handleRowClick(spending.spending_id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div 
                                                                    className="rounded-circle bg-light p-2 me-2"
                                                                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <i className={`${categoryIcons[spending.category] || categoryIcons['Other']} text-primary`}></i>
                                                                </div>
                                                                <small className="text-muted">{spending.category}</small>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="fw-medium">{spending.description}</div>
                                                        </td>
                                                        <td className="text-end">
                                                            <span className="badge bg-success fs-6">
                                                                {formatCurrency(spending.amount)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted">
                                                                {formatDate(spending.date)}
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                            <button 
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRowClick(spending.spending_id);
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="fa-solid fa-inbox fa-3x text-muted mb-3"></i>
                                        <h5 className="text-muted">No spending records found</h5>
                                        <p className="text-muted">Start by creating your first expense record!</p>
                                    </div>
                                )}
                            </div>
                            {spendingData && spendingData.length > 0 && (
                                <div className="card-footer bg-light">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <small className="text-muted">
                                                Showing {spendingData.length} record{spendingData.length !== 1 ? 's' : ''}
                                            </small>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <small className="text-muted">
                                                Total: <strong>{formatCurrency(spendingData.reduce((sum, item) => sum + item.amount, 0))}</strong>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}