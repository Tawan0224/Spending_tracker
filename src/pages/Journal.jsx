import Navbar from '../components/Navbar';
import useSpendingDataStorage from '../components/SpendData';
import React, { useState, useRef } from 'react';
import SpendingTable from '../components/SpendingTable';
import AddExpenseForm from '../components/AddExpenseForm';
import AddCategoryForm from '../components/AddCategoryForm';
import EditModalForm from '../components/EditModalForm';
import DropdownFilter from '../components/DropDownFilter';
import AlertModelOpenContext from '../components/AlertModelOpenContext';
import AlertModelForm from '../components/AlertModelForm';

export default function Journal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spendingData, setSpendingData, idToAdd, categoryData, setCategoryData] = useSpendingDataStorage();
    const [editingId, setEditingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [alertModelOpen, setAlertModelOpen] = useState(false);
    const [isConfirmAlertModal, setIsConfirmAlertModal] = useState(false);
    const [modelAlertMessage, setModelAlertMessage] = useState('');
    let confirmActionRef = useRef(null);

    const uniqueMonths = [...new Set(spendingData.map(entry =>
        new Date(entry.date).toLocaleString('default', { month: 'long' })
    ))];

    const uniqueYears = [...new Set(spendingData.map(entry =>
        new Date(entry.date).getFullYear()
    ))];

    const filteredSpendingData = spendingData.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryMonth = entryDate.toLocaleString('default', { month: 'long' });
        const entryYear = entryDate.getFullYear();

        return (
            (!selectedCategory || entry.category === selectedCategory) &&
            (!selectedMonth || entryMonth === selectedMonth) &&
            (!selectedYear || entryYear === selectedYear)
        );
    });

    return (
        <>
            <AlertModelOpenContext.Provider value={{ setAlertModelOpen, setIsConfirmAlertModal, setModelAlertMessage, confirmActionRef}}>
                <Navbar />
                <div className="container-fluid py-4" style={{ padding: '3rem' }}>
                    <div className="row mb-4">
                        <div className="col-12">
                            <h1 className="display-5 fw-bold text-black mb-0">
                                Spending Journal
                            </h1>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <AddExpenseForm
                            categoryData={categoryData}
                            setSpendingData={setSpendingData}
                            idToAdd={idToAdd}
                        />

                        <AddCategoryForm
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                        />
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white border-bottom">
                                    <h5 className="card-title mb-0 fw-semibold">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-clock-rotate-left ms-2 me-2 text-info me-3"></i>
                                                <span>Recent Transactions</span>
                                            </div>
                                            <div style={{ flex: 1 }}></div>
                                            <DropdownFilter
                                                label="Month"
                                                options={uniqueMonths}
                                                selected={selectedMonth}
                                                onSelect={setSelectedMonth}
                                            />
                                            <DropdownFilter
                                                label="Year"
                                                options={uniqueYears}
                                                selected={selectedYear}
                                                onSelect={setSelectedYear}
                                            />
                                            <DropdownFilter
                                                label="Category"
                                                options={categoryData}
                                                selected={selectedCategory}
                                                onSelect={setSelectedCategory}
                                            />
                                        </div>
                                    </h5>
                                </div>
                                <div className="card-body p-0">
                                    <SpendingTable
                                        spendingData={filteredSpendingData}
                                        setSpendingData={setSpendingData}
                                        setEditingId={setEditingId}
                                        setIsModalOpen={setIsModalOpen}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <EditModalForm
                    categoryData={categoryData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    spendingData={spendingData}
                    setSpendingData={setSpendingData}
                    editId={editingId}
                />

                {alertModelOpen && (
                    <AlertModelForm
                        setAlertModelOpen={setAlertModelOpen}
                        spendingData={spendingData}
                        isConfirmAlertModal={isConfirmAlertModal}
                        modelAlertMessage={modelAlertMessage}
                        confirmActionRef={confirmActionRef}
                    />
                )}
            </AlertModelOpenContext.Provider>
        </>
    );
}