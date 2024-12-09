
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './AddKids.css';

export default function AddKids() {
  const { isSignedIn, user } = useUser(); // Clerk user object
  const [kidName, setKidName] = useState(''); // State for kid name
  const [message, setMessage] = useState(''); // State for API response message

  const handleAddKid = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the input
    if (!kidName) {
      setMessage('Kid name is required!');
      return;
    }

    // Backend API URL
    const apiUrl = 'http://localhost:9000/api/users/add-kid';

    try { 
      // Make the POST request to the backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress || 'N/A', // Email from Clerk user object
          kidName : kidName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Kid added successfully!`);
        setKidName(''); // Reset input field
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding kid:', error);
      setMessage('An error occurred while adding the kid.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text mt-5 pt-5">Add Your Kid</div>
      {message && <p>{message}</p>} 
      {isSignedIn ? (
          <div className='d-flex justify-content-center flex-col'>
          <form onSubmit={handleAddKid} className='addkid-form justify-content-center'>
            <div className="form-row px-5">
              <div className="input-data">
                <input
                  type="text"
                  placeholder=" "
                  value={kidName}
                  onChange={(e) => setKidName(e.target.value)} // Update state on input change
                  required
                />
                <div className="underline"></div>
                <label>Kid's Name</label>
              </div>
            </div>
            <div className="form-row submit-btn d-flex justify-content-center align-items-center">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Add Kid" className='submit'/>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p>Please login..</p>
      )}
    </div>
  );
}  