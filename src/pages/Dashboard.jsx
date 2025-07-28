import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ChartLine from "../components/Linechart.jsx";
import ChartPie from "../components/Piechart.jsx";
import { getSpending } from '../services/spendingService';
import './Dashboard.css';
import Dropdown from '../components/Dropdown';

export default function Dashboard() {
  const [spendingData, setSpendingData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState("Monthly"); 

  useEffect(() => {
    const data = getSpending();
    setSpendingData(data);
    filterData(data, view);
  }, []);

  useEffect(() => {
    filterData(spendingData, view);
  }, [view, spendingData]);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = getSpending();
      setSpendingData(data);
      filterData(data, view);
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [view]);

  const filterData = (data, viewType) => {
    const now = new Date();
    let filtered = [];

    if (viewType === "Daily") {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(now.getDate() - 1);
      filtered = data.filter(entry => new Date(entry.date) >= oneDayAgo);
    } else if (viewType === "Weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = data.filter(entry => new Date(entry.date) >= oneWeekAgo);
    } else {
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(now.getDate() - 30);
      filtered = data.filter(entry => new Date(entry.date) >= oneMonthAgo);
    }

    setFilteredData(filtered);

    // For Pie chart
    const grouped = filtered.reduce((acc, entry) => {
      const found = acc.find(item => item.category === entry.category);
      if (found) {
        found.amount += entry.amount;
      } else {
        acc.push({ category: entry.category, amount: entry.amount });
      }
      return acc;
    }, []);

    setPieData(grouped);
  };

  return (
    <>
      <Navbar />
      <Hero title="Dashboard Overview" subtitle={`Current Filter: ${view}`} />
      <Dropdown onSelect={setView} />

      <div className="totals-container">
        <div className="total-box">
          <h4><i className="fa-solid fa-chart-line"></i>  Total Spending (All Time)</h4>
          <p>THB {spendingData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</p>
        </div>
        <div className="total-box">
          <h4><i className="fa-regular fa-calendar"></i>  {view}  </h4>
          <p>THB {filteredData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="charts-container">
  <div className="charts-grid">
    
    {/* Spending Trends Card */}
    <div className="chart-card">
      <h3 className="chart-title">Spending Trends</h3>
      <div className="chart-wrapper">
        {filteredData && filteredData.length > 0 ? (
          <ChartLine data={filteredData} />
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p>No spending data available for the selected period</p>
          </div>
        )}
      </div>
    </div>

    <div className="chart-card">
      <h3 className="chart-title">Spending by Category</h3>
      <div className="chart-wrapper">
        {pieData && pieData.length > 0 ? (
          <ChartPie data={pieData} />
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p>No category data available for the selected period</p>
          </div>
        )}
      </div>
    </div>
    
  </div>
</div>
    </>
  );
}