# Simple Bug Report Form

A full-stack web application built to log, manage, and track software bug reports for a course assignment.

## Tech Stack
* **Frontend:** React, Vite, JavaScript, CSS / Inline Styling, Axios
* **Backend:** Node.js, Express.js, CORS, Dotenv
* **Database:** MySQL (managed via XAMPP & phpMyAdmin)

---

## Setup & Local Installation

### 1. Repository Setup
Clone the project and navigate to the project directory:
```bash
git clone <https://github.com/KentAndreiOcampo/bug-report-app/tree/main>
cd bug-report-app

2. Database Initialization
Launch the XAMPP Control Panel and start both Apache and MySQL.

Open http://localhost/phpmyadmin/ in your browser.

Create a new database named bugtrackerdb.

Run the following SQL query in the SQL tab to set up the bugs table:
CREATE DATABASE IF NOT EXISTS bugtrackerdb;
USE bugtrackerdb;

CREATE TABLE IF NOT EXISTS bugs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3. Environment Variables (.env)
Create a .env file in the server directory to store your MySQL connection credentials securely:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admintest123
DB_NAME=bugtrackerdb
CLIENT_URL=http://localhost:5173

4. Running the Express Backend
Open a terminal, navigate to the server folder, install dependencies, and start the node server:
cd server
npm install
node app.js
The backend server runs on http://localhost:3000.

5. Running the React Client
Open a second terminal window, navigate to the client folder, install dependencies, and start the Vite dev server:
cd client
npm install
npm run dev
The frontend application runs on http://localhost:5173.

Method,Endpoint,Description
GET,/api/bugs, - Fetches all submitted bug reports from the MySQL database
POST,/api/bugs, - Saves a new bug report entry into the database
DELETE,/api/bugs/:id, - Removes a bug report entry from the database by ID

## Screenshots

1. **Bug Submission Form UI:**  
   <a href="./Screenshots/SubmissionFormUI.png" target="_blank">
     <img src="./Screenshots/SubmissionFormUi.png" alt="Bug Submission Form" width="600"/>
   </a>

2. **Submitted Bug Reports Table:**  
   <a href="./Screenshots/Submitted%20Bug%20Reports.png" target="_blank">
     <img src="./Screenshots/Submitted%20Bug%20Reports.png" alt="Submitted Bug Reports" width="600"/>
   </a>

3. **phpMyAdmin Database View:**  
   <a href="./Screenshots/Database%20View.png" target="_blank">
     <img src="./Screenshots/Database%20View.png" alt="Database View" width="600"/>
   </a>

Bonus Features Implemented:
1. Severity Categorization: Allows users to tag bug severity levels (Low, Medium, High, Critical) for better prioritization.
2. Environment Credential Security: Isolated sensitive MySQL database passwords using .env variables and kept out of version control via .gitignore.
3. Data Persistence: Database records remain safely stored in MySQL across application restarts and system reboots.

Known Issues:
1. Input validation on the client side is currently minimal (empty or short titles are not yet restricted).
2. Changing the MySQL root password locally requires updating phpMyAdmin's config.inc.php file to prevent login access errors in the web UI.