import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './AddActivity.css';

export default function AddActivity() {
    const [kids, setKids] = useState([]);
    const [selectedKidId, setSelectedKidId] = useState('');
    const [activityName, setActivityName] = useState('');
    const [schedule, setSchedule] = useState([{ day: '', time_slot: '' }]);
    const [message, setMessage] = useState('');
    const { isSignedIn, user } = useUser();

    // Fetch all kids
    useEffect(() => {
        const fetchKids = async () => {
            if (!isSignedIn || !user) return;
            try {
                const response = await axios.get('http://localhost:9000/api/users/kids', {
                    headers: {
                        email: user.primaryEmailAddress?.emailAddress,
                    },
                });
                setKids(response.data.kids);
            } catch (error) {
                console.error('Error fetching kids:', error);
                setMessage('Error fetching kids. Please try again later.');
            }
        };
        fetchKids();
    }, [isSignedIn, user]);

    // Add a new activity for the selected kid
    const handleAddActivity = async (e) => {
        e.preventDefault();

        if (!selectedKidId || !activityName || schedule.some(slot => !slot.day || !slot.time_slot)) {
            setMessage('Please fill in all fields.');
            alert('Please fill in all the details.');
            return;
        }

        alert(selectedKidId);

        try {
            const response = await axios.post('http://localhost:9000/api/users/add-activity', {
                email: user.primaryEmailAddress?.emailAddress || 'N/A',
                kidId: selectedKidId,
                activityName,
                schedule,
            });

            if (response.status === 201) {
                setMessage('Activity added successfully!');
                setActivityName('');
                setSchedule([{ day: '', time_slot: '' }]);
            } else {
                setMessage('Failed to add activity. Please try again.');
            }
        } catch (error) {
            console.error('Error adding activity:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    // Handle schedule changes
    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = schedule.map((slot, idx) =>
            idx === index ? { ...slot, [field]: value } : slot
        );
        setSchedule(updatedSchedule);
    };

    // Add a new schedule row
    const addScheduleRow = () => {
        setSchedule([...schedule, { day: '', time_slot: '' }]);
    };

    // Remove a schedule row
    const removeScheduleRow = (index) => {
        const updatedSchedule = schedule.filter((_, idx) => idx !== index);
        setSchedule(updatedSchedule);
    };

    return (
        <>
            {isSignedIn ? (
                <div className="container mt-5 pt-5">
                    <div className="text">Add Activity for Your Kid</div>
                    {message && <p>{message}</p>}
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleAddActivity} className="addkid-form justify-content-center">
                            {/* Kids Dropdown */}
                            <div className="form-row px-5">
                                <div className="input-data">
                                    <label htmlFor="kids"></label><br />
                                    <select
                                        id="kids"
                                        value={selectedKidId}
                                        onChange={(e) => setSelectedKidId(e.target.value)}
                                        required
                                    >
                                        <option value="">--Select Kid--</option>
                                        {kids.map((kid) => (
                                            <option key={kid._id} value={kid._id}>
                                                {kid.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="underline"></div>
                                </div>
                            </div>

                            {/* Activity Name */}
                            {selectedKidId && (
                                <>
                                    <div className="form-row px-5">
                                        <div className="input-data">
                                            <input
                                                type="text"
                                                value={activityName}
                                                onChange={(e) => setActivityName(e.target.value)}
                                                placeholder=""
                                                required
                                            />
                                            <div className="underline"></div>
                                            <label>Activity Name</label>
                                        </div>
                                    </div>

                                    {/* Schedule Section */}
                                    {schedule.map((slot, index) => (
                                        <div className="form-row px-5" key={index}>
                                            <div className="input-data">
                                            {/* <label>Date</label> */}
                                                <input
                                                    type="date"
                                                    value={slot.day}
                                                    onChange={(e) =>
                                                        handleScheduleChange(index, 'day', e.target.value)
                                                    }
                                                    required
                                                />
                                                <div className="underline"></div>
                                                
                                            </div>
                                            <div className="input-data">
                                                <input
                                                    type="time"
                                                    value={slot.time_slot}
                                                    onChange={(e) =>
                                                        handleScheduleChange(index, 'time_slot', e.target.value)
                                                    }
                                                    required
                                                />
                                                <div className="underline"></div>
                                                {/* <label>Time Slot</label> */}
                                            </div>
                                            {/* {schedule.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="remove-btn"
                                                    onClick={() => removeScheduleRow(index)}
                                                >
                                                    Remove
                                                </button>
                                            )} */}
                                        </div>
                                    ))}
                                    {/* <div className="form-row px-5 submit-btn">
                                        <div className="input-data">
                                            <button
                                                type="button"
                                                className="inner"
                                                onClick={addScheduleRow}
                                            >
                                                Add Another Schedule
                                            </button>
                                        </div>
                                    </div> */}
                                </>
                            )}

                            {/* Submit Button */}
                            {selectedKidId && (
                                <div className="form-row px-5 submit-btn">
                                    <div className="input-data d-flex justify-content-center">
                                        <input
                                            type="submit"
                                            value="Add Activity"
                                            className="inner"
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <p>Please login.</p>
            )}
        </>
    );
}
