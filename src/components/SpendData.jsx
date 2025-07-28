import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function useSpendingDataStorage() {
    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [categoryData, setCategoryData] = useLocalStorage('categoryData', []);
    let latest_id = spendingData.length > 0 ? Math.max(...spendingData.map(item => item.spending_id)) + 1 : 1;

    useEffect(() => {
        if (spendingData.length === 0) {
            fetch('/spending-category.json')
                .then((res) => res.json())
                .then((data) => {
                    setSpendingData(data);
                })
                .catch((err) => console.error('Failed to load spending data JSON:', err));
        }
        
        if (categoryData.length === 0) {
            fetch('/category.json')
                .then((res) => res.json())
                .then((data) => {
                    setCategoryData(data);
                })
                .catch((err) => console.error('Failed to load category data JSON:', err));
        }
    }, []);

    return [spendingData, setSpendingData, latest_id, categoryData, setCategoryData];
}