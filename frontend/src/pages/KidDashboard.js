
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './KidDashboard.css';

export default function ManageKidsActivities() {
    const [kids, setKids] = useState([]);
    const [selectedKid, setSelectedKid] = useState(null);
    const { isSignedIn, user } = useUser();
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState({}); // Store star ratings for each activity

    // Fetch kids on component load
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

                // Initialize the rating state with points from the fetched activities
                const initialRatings = {};
                response.data.kids.forEach((kid) => {
                    kid.activities.forEach((activity) => {
                        initialRatings[activity.activity_id] = activity.points;
                    });
                });
                setRating(initialRatings);

            } catch (error) {
                console.error('Error fetching kids:', error);
                setMessage('Error fetching kids. Please try again later.');
            }
        };
        fetchKids();
    }, [isSignedIn, user]);

    // Handle kid selection
    const handleKidSelection = (kidId) => {
        const kid = kids.find((k) => k.kid_id === kidId);
        setSelectedKid(kid);
    };

    // Handle rating change
    const handleRatingChange = (activityId, starCount) => {
        setRating((prev) => ({
            ...prev,
            [activityId]: starCount,
        }));
    };

    // Get points for the current month only
    const getMonthlyPoints = () => {
        if (!selectedKid) return 0;

        const currentMonth = new Date().getMonth();
        let monthlyPoints = 0;

        selectedKid.activities.forEach((activity) => {
            activity.schedule.forEach((slot) => {
                const activityDate = new Date(slot.day);
                if (activityDate.getMonth() === currentMonth) {
                    monthlyPoints += activity.points;
                }
            });
        });

        return monthlyPoints;
    };

    // Get activities for the past 7 days only
    const getRecentActivities = () => {
        if (!selectedKid) return [];

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return selectedKid.activities.filter((activity) => {
            return activity.schedule.some((slot) => {
                const activityDate = new Date(slot.day);
                return activityDate >= sevenDaysAgo;
            });
        });
    };

    // Update activity points
    const updateActivityPoints = async (activityId) => {
        try {
            const points = rating[activityId]; // Use the selected star rating as points
            if (!points) {
                setMessage('Please select a star rating to update points.');
                return;
            }

            const response = await axios.put('http://localhost:9000/api/users/update-activity-points', {
                email: user.primaryEmailAddress?.emailAddress,
                kidId: selectedKid.kid_id,
                activityId,
                points,
            });

            setMessage(response.data.message);

            // Update local state with new points for the selected activity
            setKids((prevKids) =>
                prevKids.map((kid) =>
                    kid.kid_id === selectedKid.kid_id
                        ? {
                            ...kid,
                            total_points: response.data.kid.total_points,
                            activities: kid.activities.map((activity) =>
                                activity.activity_id === activityId
                                    ? { ...activity, points: points }
                                    : activity
                            ),
                        }
                        : kid
                )
            );

            // Also update the monthly points after the update
            setSelectedKid((prevKid) => ({
                ...prevKid,
                activities: prevKid.activities.map((activity) =>
                    activity.activity_id === activityId
                        ? { ...activity, points: points }
                        : activity
                ),
            }));

        } catch (error) {
            console.error('Error updating activity points:', error);
            setMessage('Failed to update activity points. Please try again.');
        }
    };

    // Delete activity
    const deleteActivity = async (activityId) => {
        try {
            const response = await axios.delete('http://localhost:9000/api/users/delete-activity', {
                data: {
                    email: user.primaryEmailAddress?.emailAddress,
                    kidId: selectedKid.kid_id,
                    activityId,
                },
            });
            setMessage(response.data.message);

            // Remove the activity locally
            setKids((prevKids) =>
                prevKids.map((kid) =>
                    kid.kid_id === selectedKid.kid_id
                        ? {
                            ...kid,
                            activities: kid.activities.filter((activity) => activity.activity_id !== activityId),
                        }
                        : kid
                )
            );

            // Also remove from selectedKid
            setSelectedKid((prevKid) => ({
                ...prevKid,
                activities: prevKid.activities.filter((activity) => activity.activity_id !== activityId),
            }));

        } catch (error) {
            console.error('Error deleting activity:', error);
            setMessage('Failed to delete activity. Please try again.');
        }
    };

    // Helper function to determine the star color
    const getStarClass = (star) => {
        switch (star) {
            case 1: return 'text-danger';
            case 2: return 'text-warning';
            case 3: return 'text-yellow';
            case 4: return 'text-success';
            case 5: return 'text-success';
            default: return 'text-secondary';
        }
    };
    // delete kid pop box 
    const [showPopup, setShowPopup] = useState(false);

    // Delete Kid Functionality in React
    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:9000/api/users/delete-kid', {
                data: {
                    email: user.primaryEmailAddress?.emailAddress,
                    kidId: selectedKid.kid_id,
                },
            });

            setMessage(response.data.message);

            // Update local state by removing the deleted kid
            setKids((prevKids) => prevKids.filter((kid) => kid.kid_id !== selectedKid.kid_id));

            // Clear the selectedKid state if the deleted kid was selected
            if (selectedKid.kid_id === selectedKid.kid_id) {
                setSelectedKid(null);
            }

            setShowPopup(false);
        } catch (error) {
            console.error('Error deleting kid:', error);
            setMessage('Failed to delete kid. Please try again.');
            setShowPopup(false);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4 text-head">Manage Kids' Activities</h1>
            {message && <p className="text-center text-info">{message}</p>}

            {isSignedIn ? (
                <>
                    <div className="form-row mb-4">
                        <label htmlFor="kids" className="form-label">Select a Kid:</label>
                        <select
                            id="kids"
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

                    {selectedKid && (
                        <div className=" d-flex justify-content-between">
                            <h3 className='text-primary'>{selectedKid.name}'s Achievements</h3>
                            <p className="points">
                                Points : {getMonthlyPoints() || 0} <i className="bi bi-fire coin"></i>
                            </p>

                            <div>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => setShowPopup(true)}
                                >
                                    Delete Kid
                                </button>

                                {showPopup && (
                                    <div className="popup-box">
                                        <div className="popup-content">
                                            <p className='pb-5'>Are you sure you want to delete this kid?</p>
                                            <div className='d-flex justify-content-between '>
                                                <button className='btn btn-danger' onClick={handleDelete}>Yes</button>
                                                <button className='btn btn-secondary' onClick={() => setShowPopup(false)}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedKid && (
                        <div>
                            <h4><b>Recent Activities</b></h4>
                            {getRecentActivities().length > 0 ? (
                                <div className="row pb-5">
                                    {getRecentActivities().map((activity) => (
                                        <div key={activity.activity_id} className="col-11 col-sm-8 col-md-6 col-lg-4 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="">
                                                        <h6 className="text-uppercase"><b>{activity.name}</b></h6>
                                                        <div className='left-align'>
                                                            <div className="star-rating">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <span
                                                                        key={star}
                                                                        className={`star ${rating[activity.activity_id] >= star ? getStarClass(star) : 'text-secondary'}`}
                                                                        onClick={() => handleRatingChange(activity.activity_id, star)}
                                                                    >
                                                                        <i className={`bi bi-star${rating[activity.activity_id] >= star ? '-fill' : ''}`}></i>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className='text-start'>
                                                            <p className='text-start'><strong>Time:</strong> {activity.schedule[0]?.time_slot}</p>
                                                            <p className='text-start'><strong>Date:</strong> {activity.schedule[0]?.day}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => updateActivityPoints(activity.activity_id)}
                                                        className="btn btn-primary mt-3"
                                                    >
                                                        Update Activity
                                                    </button>
                                                    <button
                                                        onClick={() => deleteActivity(activity.activity_id)}
                                                        className="btn btn-danger mt-3 ml-2"
                                                    >
                                                        Delete Activity
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No recent activities found for this kid.</p>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <p>Please login to view and manage kids' activities.</p>
            )}
        </div>
    );
}
