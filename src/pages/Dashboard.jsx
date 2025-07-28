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
  const [view, setView] = useState("monthly");

  useEffect(() => {
    const data = getSpending();
    setSpendingData(data);
    filterData(data, view);
  }, []);

  useEffect(() => {
    filterData(spendingData, view);
  }, [view, spendingData]);

  const filterData = (data, viewType) => {
    const now = new Date();
    let filtered = [];

    if (viewType === "daily") {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(now.getDate() - 1);
      filtered = data.filter(entry => new Date(entry.date) >= oneDayAgo);
    } else if (viewType === "weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = data.filter(entry => new Date(entry.date) >= oneWeekAgo);
    } else {
      // Monthly (past 30 days)
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
          <h2><i class="fa-solid fa-chart-line"></i>  Total Spending (All Time)</h2>
          {/* <p>${totalAllTime}</p> */}
        </div>
        <div className="total-box">
          <h2><i class="fa-regular fa-calendar"></i>  This Month</h2>
          {/* <p>${totalSelectedMonth}</p> */}
        </div>
      </div>

      <div style={{ margin: '2rem' }}>
        <div style={{ marginTop: '2rem' }}>
          <h3>Spending Trends</h3>
          <ChartLine data={filteredData} />

          <h3 style={{ marginTop: '2rem' }}>Spending by Category</h3>
          <ChartPie data={pieData} />
        </div>
      </div>
    </>
  );
}
