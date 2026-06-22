# Knowledge Hub - Educational Notes Platform

## Overview
Knowledge Hub is a beautiful, modern educational platform designed for students to access and share study notes. The website features a sophisticated black and gold color scheme with smooth animations and an intuitive user interface.

## Features

### User Features
- **Browse Notes**: Students can view all available notes organized by subject
- **Search & Filter**: Search notes by keywords and filter by subject matter
- **View Notes**: Detailed view of each note with full content
- **Download**: Option to download notes as PDF
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Admin Features (Only for admin Gmail)
- **Upload Notes**: Upload new study materials with title, subject, and content
- **Manage Notes**: Edit, view statistics, and delete uploaded notes
- **Analytics**: Track views and downloads for each note
- **Authentication**: Secure Google authentication limited to admin email

## Pages

1. **Home (index.html)**: Landing page with features and statistics
2. **Notes (notes.html)**: Browse and search all available notes
3. **Resources (resources.html)**: Additional learning resources
4. **Admin (admin.html)**: Admin dashboard for content management
5. **Contact (contact.html)**: Get in touch with the team

## Color Scheme
- **Primary Gold**: #d4af37
- **Dark Background**: #1a1a1a
- **Light Text**: #f5f5f5
- **Text Color**: #333

## Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication with Google
- **Hosting**: GitHub Pages

## Setup Instructions

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Enable Google Authentication
5. Add your admin email to authorized users
6. Copy your Firebase config to `firebase-config.js`

### 2. Update Configuration
Edit `firebase-config.js` with your Firebase credentials:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Update Admin Email
Edit the `ADMIN_EMAIL` variable in `admin.js`:
```javascript
const ADMIN_EMAIL = 'adamkhanhnd44@gmail.com';
```

### 4. Deploy to GitHub Pages
1. Push all files to your GitHub repository
2. Go to Settings > Pages
3. Select `website-dev` branch as the deployment branch
4. Your site will be live at `https://The-Adamystic.github.io/Knowledge-Hub-2`

## Database Structure

### Notes Collection
```javascript
{
    id: string,
    title: string,
    subject: string,
    description: string,
    content: string,
    pdfUrl: string (optional),
    authorEmail: string,
    authorName: string,
    authorId: string,
    createdAt: timestamp,
    views: number,
    downloads: number
}
```

## Features Highlights

### Animations
- **Fade-in animations** on page load
- **Slide-up animations** on scroll
- **Hover effects** on cards and buttons
- **Floating shapes** in hero section
- **Pulse effects** on icons
- **Smooth transitions** throughout

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Grid layouts that adapt to screen size
- Touch-friendly buttons and inputs

### User Experience
- Smooth scrolling
- Search functionality
- Category filtering
- Modal dialogs for detailed views
- Loading spinners
- Error messages

## Admin Functions

### Upload Notes
1. Sign in with Google (must be admin email)
2. Click "Upload Notes"
3. Fill in note details:
   - Title
   - Subject (Mathematics, Science, History, Literature, Other)
   - Description
   - Full Note Content
   - PDF URL (optional)
4. Click "Upload Notes" button

### Manage Notes
1. View all your uploaded notes
2. Edit existing notes (coming soon)
3. Delete notes with confirmation
4. View note statistics (views and downloads)

## Contact
Admin Email: adamkhanhnd44@gmail.com

## License
All rights reserved © 2024 Knowledge Hub

## Version
Version 1.0 - Initial Release

## Support
For issues or questions, please contact the admin email listed above.