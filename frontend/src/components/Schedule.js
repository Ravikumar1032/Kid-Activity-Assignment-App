import React, { useState } from 'react';

function Schedule({ activities, onSchedule }) {
  const [selectedActivities, setSelectedActivities] = useState({});

  const handleSelectActivity = (activityId, day) => {
    setSelectedActivities({
      ...selectedActivities,
      [day]: activityId,
    });
  };

  const handleSubmitSchedule = () => {
    onSchedule(selectedActivities);
  };

  return (
    <div>
      <h3>Schedule Activities</h3>
      <div>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
          <div key={day}>
            <label>{day}</label>
            <select onChange={(e) => handleSelectActivity(e.target.value, day)}>
              {activities.map((activity) => (
                <option key={activity._id} value={activity._id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitSchedule}>Save Schedule</button>
    </div>
  );
}

export default Schedule;
