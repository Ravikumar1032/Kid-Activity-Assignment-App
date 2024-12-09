import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ onLogin }) {
  const handleLogin = async (response) => {
    try {
      const token = response.credential; // Google authentication token
      
      // Fetch user information from Google
      const user = await fetchUserInfo(token);

      // Send user data to the backend for validation and creation
      await sendUserToBackend(user);

      // Pass the user data to the parent component
      onLogin(user);
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  // Fetch user information from Google APIs using the token
  const fetchUserInfo = async (token) => {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user info from Google');
    }

    const userData = await res.json();
    return {
      name: userData.name,
      email: userData.email,
      avatar: userData.picture,
    };
  };

  // Send user data to the backend
  const sendUserToBackend = async (user) => {
    const res = await fetch('http://localhost:9000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error('Failed to send user data to the backend');
    }

    return res.json(); // Process backend response if needed
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
}

export default Login;
