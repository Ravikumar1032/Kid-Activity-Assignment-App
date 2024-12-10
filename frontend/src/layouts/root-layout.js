import './root-layout.css';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Footer from './Footer';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

// Clerk Publishable Key
// VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29tbXVuYWwtaW1wYWxhLTUwLmNsZXJrLmFjY291bnRzLmRldiQ
const PUBLISHABLE_KEY = 'pk_test_Y29tbXVuYWwtaW1wYWxhLTUwLmNsZXJrLmFjY291bnRzLmRldiQ';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

// Function to send user data to the backend
const sendUserToBackend = async (user) => {
  if (!user) {
    console.error('User data is undefined. Aborting backend call.');
    return;
  }

  const userData = {
    name: user.fullName.toLowerCase() || 'N/A',
    email: user.primaryEmailAddress?.emailAddress.toLowerCase() || 'N/A',
    picture: user.profileImageUrl || '',
  };

  console.log('Sending user data to backend:', userData);

  try {
    const res = await fetch('http://localhost:9000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error('Failed to send user data to the backend:', errorDetails);
      return;
    }

    const responseData = await res.json();
    console.log('User data sent successfully:', responseData);
  } catch (error) {
    console.error('Error during backend call:', error.message);
  }
};

// Component to handle user data
const UserDataHandler = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log('User is signed in:', user);
      sendUserToBackend(user);
    } else {
      console.log('User not signed in or Clerk not ready yet.');
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component only handles side effects
};

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <><ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      {/* UserDataHandler to handle user data */}
      <UserDataHandler />

      <header className="header">
        <div className='nav-row px-5'>
          <div>
            <h3 className='text-white'>Parenting App</h3>
          </div>
          <div className='d-flex justify-content-between flex-row-reverse'>
            <Navbar />
            <div className=''>
              <SignedIn>
                {/* User button for authenticated users */}
                <div className='signIn'>
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                {/* Login button for unauthenticated users */}
                <Link to="/sign-in">
                  <button className='profile_btn'> <i class="bi bi-person-circle"></i></button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>

      </header>
      <main className=''>
        <Outlet />
      </main>

    </ClerkProvider>
    </>

  );
}
