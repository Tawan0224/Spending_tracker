import { useState, useContext } from 'react';
import AlertModelOpenContext from './AlertModelOpenContext';

function AddExpenseForm({ categoryData, setSpendingData, idToAdd }) {
    const { setAlertModelOpen, setIsConfirmAlertModal, setModelAlertMessage } = useContext(AlertModelOpenContext);
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split("T")[0]
    });

    const handleAlertMessage = (message, isConfirmMessage) => {
        setModelAlertMessage(message);
        setIsConfirmAlertModal(isConfirmMessage);
        setAlertModelOpen(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Valid check
        if (!formData.category || !formData.amount || !formData.description) {
            handleAlertMessage('Please fill in all fields', false);
            return;
        }

        if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            handleAlertMessage('Please enter a valid amount', false);
            return;
        }

        // Create new record
        const newRecord = {
            spending_id: idToAdd + 1,
            description: formData.description,
            category: formData.category,
            amount: parseFloat(formData.amount),
            date: formData.date
        };

        // Add to spending data
        setSpendingData(prev => [...prev, newRecord]);

        // clear form
        setFormData({
            description: '',
            category: '',
            amount: '',
            date: new Date().toISOString().split("T")[0]
        });

        handleAlertMessage(`Record added: $${formData.amount} for ${formData.category} on ${formData.date}`, false);
    }

    return (
        <div className="col-md-6">
            <div className="card shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                    <h5 className="card-title mb-0 fw-semibold">
                        <i className="fa-solid fa-plus-circle me-2 text-primary"></i>
                        Add New Transaction
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* date field */}
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label fw-medium">
                                Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* category field */}
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label fw-medium">
                                Category
                            </label>
                            <select
                                className="form-select"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Go to club</option>
                                {categoryData.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* description field */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-medium">
                                Description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter expense description"
                                required
                            />
                        </div>

                        {/* amount field */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="form-label fw-medium">
                                Amount (THB)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        {/* submit button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-medium"
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Add Transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddExpenseForm;