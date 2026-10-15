-- server/schema.sql
CREATE DATABASE IF NOT EXISTS bugtrackerdb;
USE bugtrackerdb;

CREATE TABLE IF NOT EXISTS bugs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  severity ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
  steps TEXT NOT NULL,
  status ENUM('Open', 'In Progress', 'Resolved') NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample insert statement for testing
INSERT INTO bugs (title, description, severity, steps, status) 
VALUES ('Login button unresponsive', 'Clicking the login button on mobile view does nothing.', 'High', '1. Open mobile browser\n2. Go to login page\n3. Click login', 'Open');