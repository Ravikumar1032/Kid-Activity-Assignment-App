
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'
import HomePage from './pages/HomePage';
import ContactPage from './pages/contact';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import DashboardPage from './pages/dashboard';
import InvoicesPage from './pages/dashboard.invoices';
import AddKids from './pages/AddKids';
import AddActivity from './pages/AddActivity';
import KidDashboard from './pages/KidDashboard';
import KidsInfo from './pages/KidsInfo';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='page-body'>
      <Router>
        <Routes>
          {/* Root layout routes */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path='addKids' element={<AddKids/>} />
            <Route path='Activities' element={<AddActivity/>} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="sign-in/*" element={<SignInPage />} />
            <Route path="sign-up/*" element={<SignUpPage />} />
            <Route path="KidsDashboard" element={<KidDashboard/>} />
            <Route path="KidsInfo" element={<KidsInfo/>} />
          </Route>

          {/* Dashboard layout routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
