
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './kidsInfo.css';

// export default function KidsInfo() {
//   const [parentEmail, setParentEmail] = useState('');
//   const [kids, setKids] = useState([]);
//   const [selectedKid, setSelectedKid] = useState(null);
//   const [activities, setActivities] = useState([]);
//   const [message, setMessage] = useState('');

//   // Fetch kids based on the parent's email
//   const fetchKids = async () => {
//     if (!parentEmail) {
//       setMessage('Please enter a valid parent email.');
//       return;
//     }
//     try {
//       const response = await axios.get('http://localhost:9000/api/users/kids', {
//         headers: {
//           email: parentEmail.toLowerCase(),
//         },
//       });
//       setKids(response.data.kids);
//       setMessage('');
//     } catch (error) {
//       console.error('Error fetching kids:', error);
//       setMessage('Unable to fetch kids. Please check the parent email and try again.');
//     }
//   };

//   // Handle kid selection and fetch activities
//   const handleKidSelection = (kidId) => {
//     const kid = kids.find((k) => k.kid_id === kidId);
//     setSelectedKid(kid);
//     filterActivities(kid.activities);
//   };

//   // Filter activities to show only those scheduled for the current day
//   const filterActivities = (allActivities) => {
//     const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//     const todayActivities = allActivities.filter((activity) =>
//       activity.schedule.some((slot) => slot.day === currentDate)
//     );
//     setActivities(todayActivities);
//   };

//   return (
//     <div className="container p-5" style={{ backgroundColor: '#e7ebee', minHeight: '80vh', marginTop: '90px' }}>
//       <h1 className="text-center text-head mb-4">Kids Page</h1>

//       {/* Parent Email Input */}
//       {!kids.length && (
//         <div className="mb-4">
//           <label htmlFor="parentEmail" className="form-label">
//             Enter Parent Email:
//           </label>
//           <input
//             type="email"
//             id="parentEmail"
//             className="form-control"
//             value={parentEmail}
//             onChange={(e) => setParentEmail(e.target.value)}
//             placeholder="Enter parent's email"
//           />
//           <button className="btn btn-primary mt-3" onClick={fetchKids}>
//             Fetch Kids
//           </button>
//         </div>
//       )}

//       {/* Kids Selection */}
//       {kids.length > 0 && !selectedKid && (
//         <div className="mb-4">
//           <label htmlFor="kidsList" className="form-label">
//             Select Your Name:
//           </label>
//           <select
//             id="kidsList"
//             className="form-select"
//             onChange={(e) => handleKidSelection(e.target.value)}
//           >
//             <option value="">--Select Kid--</option>
//             {kids.map((kid) => (
//               <option key={kid.kid_id} value={kid.kid_id}>
//                 {kid.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Activities List */}
//       {selectedKid && (
//         <div>
//           <h2 className="pb-5">{selectedKid.name}'s Activities</h2>
//           {activities.length > 0 ? (
//             <div className="row">
//               {activities.map((activity) => (
//                 <div key={activity.activity_id} className="col-11 col-sm-8 col-md-6 col-lg-4 mb-4">
//                   <div className="card card-custom bg-white border-white border-0">
//                     {/* Gradient Background */}
//                     <div className="card-custom-img"></div>

//                     {/* Points Display */}
//                     <div className="card-custom-avatar text-center">
//                       <div className="avatar">
//                         {activity.points} Pts
//                         <h4 className="card-title text-center activity">{activity.name}</h4>
//                       </div>
//                     </div>

//                     {/* Card Body */}
//                     {activity.schedule.map((slot, index) => (
//                       <div key={index} className="card-body row">
//                         <div className="col-12">
//                           <strong>Day:</strong> {slot.day}
//                         </div><br />
//                         <div className="col-12">
//                           <strong>Time:</strong> {slot.time_slot}
//                         </div>
//                       </div>
//                     ))}

//                     {/* Card Footer */}
//                     <div className="card-footer text-center">
//                       <button className="btn btn-primary">Get Start</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No activities found for {selectedKid.name} today.</p>
//           )}
//         </div>
//       )}

//       {/* Message */}
//       {message && <p className="text-center text-danger mt-4">{message}</p>}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './kidsInfo.css';

export default function KidsInfo() {
  const [parentEmail, setParentEmail] = useState('');
  const [kids, setKids] = useState([]);
  const [selectedKid, setSelectedKid] = useState(null);
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  // Fetch kids based on the parent's email
  const fetchKids = async () => {
    if (!parentEmail) {
      setMessage('Please enter a valid parent email.');
      return;
    }
    try {
      const response = await axios.get('http://localhost:9000/api/users/kids', {
        headers: {
          email: parentEmail.toLowerCase(),
        },
      });
      setKids(response.data.kids);
      setMessage('');
    } catch (error) {
      console.error('Error fetching kids:', error);
      setMessage('Unable to fetch kids. Please check the parent email and try again.');
    }
  };

  // Handle kid selection and fetch activities
  const handleKidSelection = (kidId) => {
    const kid = kids.find((k) => k.kid_id === kidId);
    setSelectedKid(kid);
    filterActivities(kid.activities);
  };

  // Filter activities to show only those scheduled for the current day
  const filterActivities = (allActivities) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const todayActivities = allActivities.filter((activity) =>
      activity.schedule.some((slot) => slot.day === currentDate)
    );
    setActivities(todayActivities);
    calculateCountdowns(todayActivities);
  };

  // Function to calculate remaining time
  const calculateTimeLeft = (time) => {
    const now = new Date();
    const targetTime = new Date(time);
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) return "Time's up!";

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Calculate the countdown for each activity and store it in state
  const calculateCountdowns = (activities) => {
    const newCountdowns = {};

    activities.forEach((activity) => {
      activity.schedule.forEach((slot) => {
        newCountdowns[slot.time_slot] = calculateTimeLeft(slot.time_slot);
      });
    });

    setCountdowns(newCountdowns);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdowns(activities); // Update countdown every second
    }, 1000);

    return () => clearInterval(interval);
  }, [activities]);

  return (
    <div className="container p-5" style={{ backgroundColor: '#e7ebee', minHeight: '80vh', marginTop: '90px' }}>
      <h1 className="text-center text-head mb-4">Kids Page</h1>

      {/* Parent Email Input */}
      {!kids.length && (
        <div className="mb-4">
          <label htmlFor="parentEmail" className="form-label">
            Enter Parent Email:
          </label>
          <input
            type="email"
            id="parentEmail"
            className="form-control"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            placeholder="Enter parent's email"
          />
          <button className="btn btn-primary mt-3" onClick={fetchKids}>
            Fetch Kids
          </button>
        </div>
      )}

      {/* Kids Selection */}
      {kids.length > 0 && !selectedKid && (
        <div className="mb-4">
          <label htmlFor="kidsList" className="form-label">
            Select Your Name:
          </label>
          <select
            id="kidsList"
            className="form-select"
            onChange={(e) => handleKidSelection(e.target.value)}
          >
            <option value="">--Select Kid--</option>
            {kids.map((kid) => (
              <option key={kid.kid_id} value={kid.kid_id}>
                {kid.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Activities List */}
      {selectedKid && (
        <div>
          <h3 className=""><b>{selectedKid.name}'s Activities</b></h3>
          {activities.length > 0 ? (
            <div className="row">
              {activities.map((activity) => (
                <div key={activity.activity_id} className="col-12 col-sm-12 col-md-6 col-lg-4 ">
                  <div className="card card-custom bg-white border-white border-0 pb-5">
                    {/* Gradient Background */}
                    <div className="card-custom-img"></div>

                    {/* Points Display */}
                    <div className="card-custom-avatar">
                      <div className="avatar">
                        {activity.points} Pts
                      </div>
                      <p className="text-uppercase activity  ps-2"><b>{activity.name}for testing</b></p>
                    </div>

                    {/* Card Body */}
                    {activity.schedule.map((slot, index) => (
                      <div key={index} className="row date-time">
                        <div className="col-12  ps-3">
                          <strong>Day:</strong> {slot.day}
                        </div><br />
                        <div className="col-12  ps-3">
                          <strong>Time:</strong> {slot.time_slot}
                        </div>
                        <div className="col-12">
                          {/* <strong>Time left:</strong> {countdowns[slot.time_slot]} */}
                          <div className="text-center my-2">
                            <button className="btn btn-primary">Get Start</button>
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No activities found for {selectedKid.name} today.</p>
          )}
        </div>
      )}

      {/* Message */}
      {message && <p className="text-center text-danger mt-4">{message}</p>}
    </div>
  );
}
