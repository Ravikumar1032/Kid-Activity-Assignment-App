import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KidDashboard from '../components/KidDashboard';
import DashboardLayout from '../layouts/dashboard-layout';

function Dashboard() {
    const [kids, setKids] = useState([]);
    const email = "parent@example.com"; // Replace with logged-in user's email

    useEffect(() => {
        fetchKids();
    }, []);

    const fetchKids = async () => {
        try {
            const response = await axios.get(`/get-activities`, {
                params: { email },
            });
            setKids(response.data.activities);
        } catch (error) {
            console.error('Error fetching kids:', error);
        }
    };

    return (
        <div>
            <DashboardLayout />
            <h1>Dashboard</h1>
            {kids.length > 0 ? (
                kids.map((kid) => (
                    <KidDashboard key={kid.kid_id} kid={kid} />
                ))
            ) : (
                <p>No kids found. Add a kid to get started.</p>
            )}
        </div>
    );
}

export default Dashboard;
