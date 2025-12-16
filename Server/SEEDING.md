# Database Seeding Guide

## Overview
The seed.js file populates your database with sample data for testing and development.

## What Gets Created

### Users (5)
- **Instructor 1**: john.instructor@example.com
- **Instructor 2**: jane.instructor@example.com
- **Student 1**: mike.student@example.com
- **Student 2**: sarah.student@example.com
- **Admin**: admin@example.com

**Password for all users**: `password123`

### Categories (5)
- Web Development
- Data Science
- Mobile Development
- DevOps
- Cloud Computing

### Courses (5)
1. Complete Web Development Bootcamp - ₹4,999
2. React.js Complete Course - ₹5,999
3. Python for Data Science - ₹6,999
4. Mobile App Development with React Native - ₹7,999
5. DevOps Essentials - ₹8,999

### Course Content
- 4 Sections with 7 SubSections (video lectures)
- Sample ratings and reviews
- Student enrollments

## How to Seed

### Step 1: Make sure MongoDB is running
```bash
# Check if MongoDB is connected in your .env file
MONGODB_URL=your_mongodb_connection_string
```

### Step 2: Run the seed command
```bash
cd Server
npm run seed
```

### Step 3: Verify
The script will output success messages and test credentials.

## After Seeding

You can now:
- Login with any of the test accounts
- Browse courses as a student
- Create/manage courses as an instructor
- Manage categories as admin

## Reset Database
To clear all data and reseed:
```bash
npm run seed
```
The script automatically clears existing data before seeding.

## Notes
- Make sure your MongoDB connection is working
- The script will exit automatically after completion
- All passwords are hashed with bcrypt
- Sample profile data is included for all users
