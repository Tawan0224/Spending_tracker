import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function useSpendingDataStorage() {
    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [categoryData, setCategoryData] = useLocalStorage('categoryData', []);
    let latest_id = spendingData.length > 0 ? spendingData[spendingData.length - 1].spending_id : 0;

    useEffect(() => {
        fetch('/spending-category.json')
            .then((res) => res.json())
            .then((data) => {
                setSpendingData(data);
            })
            .catch((err) => console.error('Failed to load spending data JSON:', err));
        fetch('/category.json')
            .then((res) => res.json())
            .then((data) => {
                setCategoryData(data);
            })
            .catch((err) => console.error('Failed to load category data JSON:', err));
    }, []);

    return [spendingData, setSpendingData, latest_id, categoryData, setCategoryData];
}