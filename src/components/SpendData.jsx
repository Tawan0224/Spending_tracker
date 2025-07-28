import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import spendingCategoryData from '../assets/spending-category.json';
import categoryDataJson from '../assets/category.json';

export default function useSpendingDataStorage() {
    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [categoryData, setCategoryData] = useLocalStorage('categoryData', []);
    let latest_id = spendingData.length > 0 ? spendingData[spendingData.length - 1].spending_id : 0;

    useEffect(() => {
        const loadInitialData = () => {
            if (spendingData.length === 0) {
                try {
                    setSpendingData(spendingCategoryData);
                } catch (err) {
                    console.error('Failed to load spending data JSON:', err);
                }
            }

            if (categoryData.length === 0) {
                try {
                    setCategoryData(categoryDataJson);
                } catch (err) {
                    console.error('Failed to load category data JSON:', err);
                }
            }
        };

        loadInitialData();
    }, []);

    return [spendingData, setSpendingData, latest_id, categoryData, setCategoryData];
}