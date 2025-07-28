import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function useSpendingDataStorage() {
    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [categoryData, setCategoryData] = useLocalStorage('categoryData', []);
    let latest_id = spendingData.length > 0 ? spendingData[spendingData.length - 1].spending_id : 0;

    useEffect(() => {
        const loadInitialData = async () => {
            if (spendingData.length === 0) {
                try {
                    const res = await fetch('/spending-category.json');
                    const data = await res.json();
                    setSpendingData(data);
                } catch (err) {
                    console.error('Failed to load spending data JSON:', err);
                }
            }

            if (categoryData.length === 0) {
                try {
                    const res = await fetch('/category.json');
                    const data = await res.json();
                    setCategoryData(data);
                } catch (err) {
                    console.error('Failed to load category data JSON:', err);
                }
            }
        };

        loadInitialData();
    }, []);


    return [spendingData, setSpendingData, latest_id, categoryData, setCategoryData];
}