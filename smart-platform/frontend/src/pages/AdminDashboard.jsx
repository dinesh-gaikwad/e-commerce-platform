import React from "react";

export default function AdminDashboard() {

  return (

    <div className="admin-layout">

      <div className="sidebar">

        <h2>👑 Admin</h2>

        <a href="/">Dashboard</a>
        <a href="/">Products</a>
        <a href="/">Orders</a>
        <a href="/">Users</a>

      </div>

      <div className="admin-content">

        <h1>🚀 Admin Dashboard</h1>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>120</h3>
            <p>Products</p>
          </div>

          <div className="dashboard-card">
            <h3>50</h3>
            <p>Orders</p>
          </div>

          <div className="dashboard-card">
            <h3>15</h3>
            <p>Users</p>
          </div>

        </div>

      </div>

    </div>
  );
}