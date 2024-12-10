# Parenting App
---

## App Screenshots

![page #1](./Images/Screenshot%20(143).png)
![page #2](./Images/Screenshot%20(144).png)
![page #3](./Images/Screenshot%20(145).png)
![page #5](./Images/Screenshot%20(147).png)
![page #6](./Images/Screenshot%20(148).png)
![page #7](./Images/Screenshot%20(149).png)
![page #8](./Images/Screenshot%20(150).png)
![page #9](./Images/Screenshot%20(151).png)
![page #10](./Images/Screenshot%20(152).png)
![page #11](./Images/Screenshot%20(153).png)
![page #12](./Images/Screenshot%20(154).png)
![page #13](./Images/Screenshot%20(155).png)
![page #14](./Images/Screenshot%20(156).png)
![page #15](./Images/Screenshot%20(157).png)
![page #17](./Images/Screenshot%20(159).png)
![page #18](./Images/Screenshot%20(160).png)
![page #19](./Images/Screenshot%20(161).png)


# Parenting App  

## Project Overview  
The **Parenting App** is a full-stack web application designed to help parents manage and track their kids' activities and achievements. This platform allows users to:  
- View and manage kids' activities.  
- Update activity points dynamically.  
- Track monthly and recent activity performance.  
- Delete activities and kids with confirmation dialogs.  
---

## Features  
- **View Kids & Activities:** Display a list of kids and their associated activities.  
- **Dynamic Points Calculation:** Automatically calculates total, monthly, and recent activity points.  
- **Update Activities:** Adjust points for individual activities in real-time.  
- **Activity Deletion:** Remove specific activities with instant updates to the database.  
- **Kid Deletion:** Safely delete kids with a confirmation prompt.  

---

## Technologies Used  

### Frontend  
- React  
- HTML, CSS  
- Bootstrap  

### Backend  
- Node.js  
- Express.js  
- MongoDB with Mongoose  

### Other Tools  
- Git & GitHub for version control  
- Postman for API testing  

---

## Getting Started  

### Prerequisites  
- Node.js  
- MongoDB (local or cloud instance)  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/ParentingApp.git  
   cd ParentingApp

## Installation

### Backend
```bash
cd backend
npm install
```
### Frontend
```bash
cd ../frontend
npm install
```

## Run the application:
Start the backend server:
To start the backend server, run the following command:
```bash
cd backend
npm run dev
```

Start the frontend application:
To start the frontend application, run the following command:

```bash
cd ../frontend
npm start
```


## API Endpoints
### Kids Management
- GET /api/users/kids: Fetch all kids for the logged-in user.
- PUT /api/users/update-activity-points: Update activity points.
- DELETE /api/users/delete-activity: Delete a specific activity.
- DELETE /api/users/delete-kid: Delete a kid from the user's profile.

## Folder Structure

### Frontend
frontend/
│── .env
│── package.json
├── public/
├── src/
    ├── components/
    │   ├── Dashboard.js
    │   ├── Footer.jsx
    │   ├── isUserLoged.js
    │   ├── Login.js
    │   ├── Navbar.css
    │   ├── Navbar.js
    │   ├── Schedule.js
    ├── layouts/
    ├── pages/
    │   ├── AddActivity.js
    │   ├── AddKids.js
    │   ├── HomePage.js
    │   ├── KidDashboard.js
    │   ├── KidsInfo.jsx
    │   ├── sign-in.js
    │   ├── sign-up.js
    ├── services/
    ├── utilities/

### Backend
backend/
│── .env
│── package.json
├── config/
│   ├── db.js
├── controllers/
│   ├── activityController.js
│   ├── aggregation.js
│   ├── authController.js
│   ├── userController.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── Activity.js
│   ├── notification.js
│   ├── schedule.js
│   ├── User.js
├── routes/
├── server.js




