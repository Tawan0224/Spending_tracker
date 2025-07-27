import Navbar from '../components/Navbar';
import './journal.css';
import useSpendingDataStorage from '../components/SpendData';
import SpendingCard from '../components/SpendingCard';
import React, { useState } from 'react';
import SpendModalForm from '../components/SpendModalForm';
import SpendingTable from '../components/SpendingTable';

export default function Journal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spendingData, setSpendingData, idToAdd] = useSpendingDataStorage();

    return (
        <>
            <Navbar />
            <div className='journal-page'>
                <div className='create-spend-row' onClick={() => setIsModalOpen(true)}>
                    <div className='rectangle'>
                        <div className='circle'>
                            <i className="fa-solid fa-plus plus-icon"></i>
                        </div>
                    </div>
                    <h1>Create Spending Journal</h1>
                </div>

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
                <SpendingTable spendingData={spendingData} />
            </div>

            <SpendModalForm 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
                spendingData={spendingData}
                setSpendingData={setSpendingData}
                latestId={idToAdd}
            />
        </>
    );
}
