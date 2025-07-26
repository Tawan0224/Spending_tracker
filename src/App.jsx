// import { useState } from 'react'
// import React from 'react'
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
// } from 'recharts';
// import { CartesianGrid } from 'recharts';
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];



// function App() {
//   return (
//     <>
//       {/* navbar */}
//       <nav className='navbar'>
//         <div className='navbar-left'>
//           <img src="./src/Tawan.png" alt="Logo" className='logo-pic'/>
//           <span className="logo-text">
//             TRACKLY<br />
//             <span className="logo-text2">Spending Tracker</span>
//           </span>
//         </div>

//         <div className='nav-buttons'>
//           <button>
//             Dashboard
//           </button>

//           <button>
//             Journal
//           </button>
//         </div>
//       </nav>

      

//     <div style={{ width: '100%', height: 400 }}>
//   <ResponsiveContainer width="100%" height="100%">
//   <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//   </ResponsiveContainer>
// </div>
//     </>
//   )
// }

// export default App




import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;