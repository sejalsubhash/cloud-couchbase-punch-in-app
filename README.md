# Cloud-Based Punch-In Tracking Application

## Overview

This project demonstrates the design and deployment of a **cloud-based web application** that records punch-in times and stores them in a managed NoSQL cloud database.

The application captures the user's local system time through a web interface and stores it in a **Couchbase cloud database** through a backend API. The entire application is deployed on a cloud platform with automated deployment from a Git repository.

This project focuses on **cloud deployment, managed database services, environment variable management, and CI/CD integration**.

---

## Cloud Technologies Used

Application Runtime

* Node.js
* Express.js

Cloud Database

* Couchbase Capella

Cloud Hosting

* Render

Source Code Management

* GitHub

Frontend

* HTML
* CSS
* JavaScript

---

## Cloud Architecture

User Browser
↓
Web Application (Hosted on Render)
↓
Backend API (Node.js + Express)
↓
Managed NoSQL Database (Couchbase Capella)

This architecture demonstrates a **cloud-native application workflow** where the frontend interacts with a backend service that communicates with a managed cloud database.

---

## Key Cloud Features

* Fully deployed cloud application
* Managed NoSQL database integration
* Cloud-based hosting environment
* Secure environment variable configuration
* Continuous deployment from GitHub
* API-based communication between frontend and backend

---

## Project Structure

```id="i2o3yl"
cloud-punch-in-app
│
├── server.js        # Backend API server
├── index.html       # Web interface
├── package.json     # Node.js dependencies
└── README.md        # Project documentation
```

---

## Cloud Deployment Workflow

Code Development
↓
Push Code to GitHub
↓
Render pulls repository automatically
↓
Application build process runs on Render
↓
Application deployed as a web service
↓
Application connects securely to Couchbase cloud database

This workflow demonstrates a **basic CI/CD pipeline using GitHub and Render**.

---

## Environment Variables

Sensitive configuration values are stored using cloud environment variables instead of hardcoding them in the application.

Required environment variables:

```id="cd4jq3"
COUCHBASE_CONNECTION_STRING
COUCHBASE_USERNAME
COUCHBASE_PASSWORD
COUCHBASE_BUCKET
```

These variables are configured inside the Render service dashboard.

---

## Database Configuration

The application uses **Couchbase Capella** as a fully managed NoSQL database service.

Setup includes:

1. Creating a Couchbase Capella cluster
2. Creating a database bucket
3. Creating a database user with bucket access
4. Allowing network access for the cloud application
5. Using a secure connection string for database access

---

## Application Workflow

1. The user accesses the web application through a browser.
2. The user clicks the Punch-In button.
3. The application captures the local system time.
4. The frontend sends the data to the backend API.
5. The backend API stores the record in Couchbase.
6. The cloud database securely stores the punch-in record.

---

## Example Stored Record

```id="stf43p"
{
 "time": "12/03/2026, 4:45:12 PM"
}
```

---

## Cloud Skills Demonstrated

* Cloud application deployment
* Managed database integration
* Environment variable management
* Cloud-based CI/CD workflow
* Backend API development
* NoSQL database operations

