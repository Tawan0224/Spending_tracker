import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../pages/journal.css';

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

function SpendingCard(
    { spendingId, category, amount, date, description }
) {
    const navigate = useNavigate();
    const handleClick = (spendingId) => {
        // Navigate to the spending detail page
        navigate(`/journal/${spendingId}`);
    };
    return (
        <li key={spendingId} className="spending-card" onClick={() => handleClick(spendingId)}>
            <div className='circle2'>
                <i className={categoryIcons[category] + " category-icon"}></i>
            </div>
            <h1>{description}</h1>
            <div className='spacer'></div>
            <div className='main-info'>
                <p className='spend-amount'>{amount}</p>
                <hr />
                <p className='spend-date'>{date}</p>
            </div>
        </li>
    );
}

export default SpendingCard 