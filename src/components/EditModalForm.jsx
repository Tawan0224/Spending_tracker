import { useState, useEffect } from 'react';

function EditModalForm({ categoryData, isModalOpen, setIsModalOpen, spendingData, setSpendingData, editId }) {
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        date: ''
    });

    // Pre-populate form when editing
    useEffect(() => {
        if (isModalOpen && editId) {
            const recordToEdit = spendingData.find(item => item.spending_id === editId);
            if (recordToEdit) {
                setFormData({
                    description: recordToEdit.description,
                    category: recordToEdit.category,
                    amount: recordToEdit.amount.toString(),
                    date: recordToEdit.date
                });
            }
        }
    }, [isModalOpen, editId, spendingData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = () => {
        console.log('Form data on submit:', formData);

        if (!formData.date) {
            formData.date = new Date().toISOString().split("T")[0];
        }

        // Validation
        if (!formData.category || !formData.amount || !formData.description) {
            alert('Please fill in all fields');
            return;
        }

        if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const recordData = {
            spending_id: editId,
            description: formData.description,
            category: formData.category,
            amount: parseFloat(formData.amount),
            date: formData.date
        };

        // Update existing record
        setSpendingData(prev =>
            prev.map(item =>
                item.spending_id === editId ? recordData : item
            )
        );

        alert(`Record updated: $${formData.amount} for ${formData.category} on ${formData.date}`);
        
        setFormData({ description: '', date: '', category: '', amount: '' });
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setFormData({ description: '', date: '', category: '', amount: '' });
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && (
                <>
                    {/* The background thing when modal opens */}
                    <div className="modal-backdrop fade show"></div>

                    {/* the modal */}
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow-lg">

                                {/* modal header */}
                                <div className="modal-header border-bottom">
                                    <h5 className="modal-title fw-semibold">
                                        <i className="fa-solid fa-pen-to-square me-2 text-primary"></i>
                                        Edit Expense
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCancel}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                {/* modal body */}
                                <div className="modal-body">

                                    {/* description field */}
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label fw-medium">
                                            Description <span className="text-danger">*</span>
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

                                    {/* date field */}
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label fw-medium">
                                            Date <span className="text-danger">*</span>
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
                                            Spending Category <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose a category...</option>
                                            {categoryData.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* amount field */}
                                    <div className="mb-4">
                                        <label htmlFor="amount" className="form-label fw-medium">
                                            Amount <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">THB</span>
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
                                    </div>
                                </div>

                                {/* modal footer */}
                                <div className="modal-footer border-top">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                        <i className="fa-solid fa-check-circle me-1"></i>
                                        Update Record
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default EditModalForm