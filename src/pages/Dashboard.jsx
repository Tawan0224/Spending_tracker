import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ChartLine from "../components/Linechart.jsx";
import ChartPie from "../components/Piechart.jsx";
import useSpendingDataStorage from '../components/SpendData'; // Only using the hook
import './Dashboard.css';
import Dropdown from '../components/Dropdown';

export default function Dashboard() {
  // Get data directly from the hook - same source as Journal
  const [spendingData] = useSpendingDataStorage();

  const [pieData, setPieData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState("Monthly");

  // Update charts whenever spendingData or view changes
  useEffect(() => {
    console.log('Dashboard: spendingData updated', spendingData); // Debug log
    filterData(spendingData, view);
  }, [spendingData, view]);

  const filterData = (data, viewType) => {
    console.log('Filtering data:', { data, viewType }); // Debug log

    if (!data || data.length === 0) {
      setFilteredData([]);
      setPieData([]);
      return;
    }

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
      // Monthly (past 30 days)
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(now.getDate() - 30);
      filtered = data.filter(entry => new Date(entry.date) >= oneMonthAgo);
    }

    console.log('Filtered data result:', filtered); // Debug log
    if (JSON.stringify(filteredData) !== JSON.stringify(filtered)) {
      setFilteredData(filtered);
    }

    // Group by category for pie chart
    const grouped = filtered.reduce((acc, entry) => {
      const found = acc.find(item => item.category === entry.category);
      if (found) {
        found.amount += entry.amount;
      } else {
        acc.push({ category: entry.category, amount: entry.amount });
      }
      return acc;
    }, []);

    console.log('Pie chart data:', grouped); // Debug log

    // Only update if pie data has changed
    if (JSON.stringify(pieData) !== JSON.stringify(grouped)) {
      setPieData(grouped);
    }
  };

  // Calculate totals directly from hook data
  const totalAllTime = spendingData && spendingData.length > 0
    ? spendingData.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0;

  const totalFiltered = filteredData && filteredData.length > 0
    ? filteredData.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0;

  console.log('Totals calculated:', { totalAllTime, totalFiltered }); // Debug log

  return (
    <>
      <Navbar />
      <Hero title="Dashboard Overview" subtitle={`Current Filter: ${view}`} />
      <Dropdown onSelect={setView} />

      <div className="totals-container">
        <div className="total-box">
          <h4><i className="fa-solid fa-chart-line"></i> Total Spending (All Time)</h4>
          <p>THB {totalAllTime.toFixed(2)}</p>
        </div>
        <div className="total-box">
          <h4><i className="fa-regular fa-calendar"></i> {view}</h4>
          <p>THB {totalFiltered.toFixed(2)}</p>
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

          {/* Spending by Category Card */}
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