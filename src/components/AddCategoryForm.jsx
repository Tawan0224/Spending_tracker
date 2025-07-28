import { useState, useContext } from 'react';
import AlertModelOpenContext from './AlertModelOpenContext';

function AddCategoryForm({ categoryData, setCategoryData }) {
    const [newCategoryName, setNewCategoryName] = useState('');

    const {
        setAlertModelOpen,
        setIsConfirmAlertModal,
        setModelAlertMessage,
        confirmActionRef,
    } = useContext(AlertModelOpenContext);

    const showAlert = (message, isConfirm = false, onConfirm = null) => {
        setModelAlertMessage(message);
        setIsConfirmAlertModal(isConfirm);
        if (isConfirm && onConfirm) {
            confirmActionRef.current = onConfirm;
        }
        setAlertModelOpen(true);
    };

    const handleAddCategory = (e) => {
        e.preventDefault();

        const trimmedName = newCategoryName.trim();
        if (!trimmedName) {
            showAlert('Please enter a category name');
            return;
        }

        if (categoryData.includes(trimmedName)) {
            showAlert('Category already exists');
            return;
        }

        setCategoryData(prev => [...prev, trimmedName]);
        setNewCategoryName('');
        showAlert(`Category "${trimmedName}" added successfully!`);
    };

    const handleRemoveCategory = (categoryToRemove) => {
        showAlert(
            `Are you sure you want to remove "${categoryToRemove}" category?`,
            true,
            () => {
                setCategoryData(prev => prev.filter(cat => cat !== categoryToRemove));
            }
        );
    };

    return (
        <div className="col-md-6">
            <div className="card shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                    <h5 className="card-title mb-0 fw-semibold">
                        <i className="fa-solid fa-tags me-2 text-success"></i>
                        Add New Category
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleAddCategory}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label fw-medium">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoryName"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Enter new category"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 py-2 fw-medium mb-4"
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Add Category
                        </button>
                    </form>

                    <div>
                        <h6 className="fw-medium mb-3">Current Categories:</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {categoryData && categoryData.length > 0 ? (
                                categoryData.map((category, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-primary px-3 py-2 fs-6 position-relative"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleRemoveCategory(category)}
                                    >
                                        {category}
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white position-absolute top-0 start-100 translate-middle"
                                            style={{ fontSize: '0.6rem', padding: '0.2rem' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveCategory(category);
                                            }}
                                            aria-label="Remove category"
                                        ></button>
                                    </span>
                                ))
                            ) : (
                                <p className="text-muted mb-0">No categories available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryForm;
