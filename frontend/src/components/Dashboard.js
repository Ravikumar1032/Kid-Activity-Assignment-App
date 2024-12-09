import React from 'react';

function Dashboard({ kids }) {
  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        {kids.map((kid) => (
          <div key={kid._id}>
            <h4>{kid.name}</h4>
            <p>Points: {kid.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
