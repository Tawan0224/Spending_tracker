import React from 'react'
import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

function useSpendingData() {
    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);

    useEffect(() => {
        fetch('/spending-category.json')
            .then((res) => res.json())
            .then((data) => {
                setSpendingData((prevData) => [...data, ...prevData]);
            })
            .catch((err) => console.error('Failed to load spending data JSON:', err));
    }, [setSpendingData]);

    return [spendingData, setSpendingData];
}

export default useSpendingData