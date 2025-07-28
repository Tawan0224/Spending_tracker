import Navbar from '../components/Navbar';
import './journal.css';
import useSpendingDataStorage from '../components/SpendData';
import React, { useState } from 'react';
import SpendModalForm from '../components/SpendModalForm';
import SpendingTable from '../components/SpendingTable';

export default function Journal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spendingData, setSpendingData, idToAdd, categoryData, _] = useSpendingDataStorage();
    const [editingId, setEditingId] = useState(null);

    return (
        <>
            <Navbar />
            <div className='journal-page'>
                <button className='create-spend-row' onClick={() => setIsModalOpen(true)}>
                    <div className='rectangle'>
                        <div className='circle'>
                            <i className="fa-solid fa-plus plus-icon"></i>
                        </div>
                    </div>
                    <h1>Create Spending Journal</h1>
                </button>

                {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {spendingData.map((spending) => (
                        <SpendingCard
                            key={spending.spending_id}
                            spendingId={spending.spending_id}
                            category={spending.category}
                            amount={spending.amount}
                            date={spending.date}
                            description={spending.description}
                        />
                    ))}
                </ul> */}
                {/* Table */}
                <SpendingTable 
                    spendingData={spendingData} 
                    setSpendingData={setSpendingData}
                    setEditingId={setEditingId}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>

            <SpendModalForm 
                categoryData={categoryData}
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
                setSpendingData={setSpendingData}
                latestId={idToAdd}
                isEditing={editingId !== null}
                editId={editingId}
            />
        </>
    );
}
