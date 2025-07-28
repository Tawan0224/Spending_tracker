import React, { useState } from 'react'

function SpendModalForm({ categoryData, isModalOpen, setIsModalOpen, setSpendingData, idToAdd, isEditing = false, editId = null }) {
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = () => {
        console.log('Form data on submit:', formData); // Debug line

        if (!formData.date) {
            // set to today's date automatically
            formData.date = new Date().toISOString().split("T")[0];
        }

        // check
        if (!formData.category || !formData.amount || !formData.description) {
            alert('Please fill in all fields');
            return;
        }

        if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const recordData = {
            spending_id: isEditing ? editId : idToAdd + 1,
            description: formData.description,
            category: formData.category,
            amount: parseFloat(formData.amount),
            date: formData.date
        };

        setIsModalOpen(false);
        if (isEditing) {
            // Update existing record
            setSpendingData(prev =>
                prev.map(item =>
                    item.spending_id === editId ? recordData : item
                )
            );
            alert(`Record updated: $${formData.amount} for ${formData.category} on ${formData.date}`);
        } else {
            // Add new record
            setSpendingData(prev => [...prev, recordData]);
            alert(`Record added: $${formData.amount} for ${formData.category} on ${formData.date}`);
        }

        setFormData({ description: '', date: '', category: '', amount: '' });
    }

    const handleCancel = () => {
        setFormData({ date: '', category: '', amount: '' });
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && (
                <>
                    {/* Modal Backdrop */}
                    <div className="modal-backdrop fade show"></div>

                    {/* Modal */}
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow-lg">

                                {/* Modal Header */}
                                <div className="modal-header border-bottom">
                                    <h5 className="modal-title fw-semibold">
                                        <i className="bi bi-receipt me-2 text-primary"></i>
                                        {isEditing ? 'Edit Expense' : 'Add New Expense'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCancel}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                {/* Modal Body */}
                                <div className="modal-body">

                                    {/* Description Field */}
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

                                    {/* Date Field */}
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label fw-medium">
                                            Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            name="date"
                                            value={!formData.date ? new Date().toISOString().split("T")[0] : formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    {/* Category Field */}
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

                                    {/* Amount Field */}
                                    <div className="mb-4">
                                        <label htmlFor="amount" className="form-label fw-medium">
                                            Amount <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
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

                                {/* Modal Footer */}
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
                                        <i className="bi bi-check-circle me-1"></i>
                                        {isEditing ? 'Update Record' : 'Add Record'}
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

export default SpendModalForm