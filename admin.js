// Firebase Admin Panel JavaScript
let currentUser = null;
let userNotesCollection = null;
const ADMIN_EMAIL = 'adamkhanhnd44@gmail.com';

// DOM Elements
const authSection = document.getElementById('authSection');
const adminPanel = document.getElementById('adminPanel');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const uploadForm = document.getElementById('uploadForm');
const uploadMessage = document.getElementById('uploadMessage');
const adminMenuItems = document.querySelectorAll('.admin-menu-item');
const adminSections = document.querySelectorAll('.admin-section');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

let noteToDelete = null;

// Initialize
if (firebase && firebase.auth) {
    firebase.auth().onAuthStateChanged(user => {
        if (user && user.email === ADMIN_EMAIL) {
            currentUser = user;
            userNotesCollection = user.uid;
            showAdminPanel(user);
            loadAdminNotes();
        } else {
            hideAdminPanel();
        }
    });
}

// Google Sign In
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', () => {
        if (firebase && firebase.auth) {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    if (result.user.email === ADMIN_EMAIL) {
                        console.log('Signed in as:', result.user.email);
                    } else {
                        firebase.auth().signOut();
                        alert('Access denied. Only authorized admin can access this panel.');
                    }
                })
                .catch(error => {
                    console.error('Sign-in error:', error);
                    alert('Sign-in failed. Please try again.');
                });
        }
    });
}

// Sign Out
if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
        if (firebase && firebase.auth) {
            firebase.auth().signOut().then(() => {
                currentUser = null;
                console.log('Signed out successfully');
            });
        }
    });
}

// Show Admin Panel
function showAdminPanel(user) {
    authSection.style.display = 'none';
    adminPanel.style.display = 'grid';

    // Set user info
    document.getElementById('userName').textContent = user.displayName || 'Admin';
    document.getElementById('userEmail').textContent = user.email;
    if (user.photoURL) {
        document.getElementById('userPhoto').src = user.photoURL;
    }
}

// Hide Admin Panel
function hideAdminPanel() {
    adminPanel.style.display = 'none';
    authSection.style.display = 'flex';
}

// Menu Item Click Handler
adminMenuItems.forEach(item => {
    item.addEventListener('click', function() {
        adminMenuItems.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const section = this.getAttribute('data-section');
        adminSections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(section + 'Section').classList.add('active');

        if (section === 'manage') {
            loadAdminNotes();
        } else if (section === 'stats') {
            loadStatistics();
        }
    });
});

// Upload Form Handler
if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('noteTitle').value;
        const subject = document.getElementById('noteSubject').value;
        const description = document.getElementById('noteDescription').value;
        const content = document.getElementById('noteContent').value;
        const pdfUrl = document.getElementById('notePdfUrl').value;

        if (firebase && firebase.firestore && currentUser) {
            const db = firebase.firestore();
            const notesRef = db.collection('notes').doc();

            notesRef.set({
                id: notesRef.id,
                title: title,
                subject: subject,
                description: description,
                content: content,
                pdfUrl: pdfUrl,
                authorEmail: currentUser.email,
                authorName: currentUser.displayName,
                authorId: currentUser.uid,
                createdAt: new Date(),
                views: 0,
                downloads: 0
            })
            .then(() => {
                showMessage('Note uploaded successfully!', 'success');
                uploadForm.reset();
                loadAdminNotes();
            })
            .catch(error => {
                console.error('Error uploading note:', error);
                showMessage('Error uploading note. Please try again.', 'error');
            });
        } else {
            showMessage('Please sign in first.', 'error');
        }
    });
}

// Load Admin Notes
function loadAdminNotes() {
    const adminNotesList = document.getElementById('adminNotesList');
    if (!adminNotesList) return;

    if (firebase && firebase.firestore && currentUser) {
        const db = firebase.firestore();
        adminNotesList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading notes...</p></div>';

        db.collection('notes')
            .where('authorId', '==', currentUser.uid)
            .onSnapshot(snapshot => {
                adminNotesList.innerHTML = '';
                if (snapshot.empty) {
                    adminNotesList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">You haven\'t uploaded any notes yet.</p>';
                    return;
                }

                snapshot.forEach(doc => {
                    const note = doc.data();
                    const noteItem = document.createElement('div');
                    noteItem.className = 'admin-note-item';
                    noteItem.innerHTML = `
                        <div class="admin-note-info">
                            <h3>${note.title}</h3>
                            <p>Subject: ${note.subject} | Views: ${note.views || 0} | Downloads: ${note.downloads || 0}</p>
                        </div>
                        <div class="admin-note-actions">
                            <button class="btn-edit" onclick="editNote('${doc.id}')">Edit</button>
                            <button class="btn-delete" onclick="deleteNoteConfirm('${doc.id}', '${note.title}')">Delete</button>
                        </div>
                    `;
                    adminNotesList.appendChild(noteItem);
                });
            }, error => {
                console.error('Error loading notes:', error);
                adminNotesList.innerHTML = '<p style="color: red;">Error loading notes. Please refresh the page.</p>';
            });
    }
}

// Delete Note Confirmation
function deleteNoteConfirm(noteId, noteTitle) {
    noteToDelete = noteId;
    deleteModal.style.display = 'flex';
}

if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
        if (noteToDelete && firebase && firebase.firestore) {
            const db = firebase.firestore();
            db.collection('notes').doc(noteToDelete).delete()
                .then(() => {
                    deleteModal.style.display = 'none';
                    loadAdminNotes();
                    showMessage('Note deleted successfully!', 'success');
                })
                .catch(error => {
                    console.error('Error deleting note:', error);
                    showMessage('Error deleting note.', 'error');
                });
        }
    });
}

if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        noteToDelete = null;
    });
}

window.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});

// Edit Note
function editNote(noteId) {
    alert('Edit functionality coming soon!');
}

// Load Statistics
function loadStatistics() {
    if (firebase && firebase.firestore && currentUser) {
        const db = firebase.firestore();

        db.collection('notes')
            .where('authorId', '==', currentUser.uid)
            .onSnapshot(snapshot => {
                let totalNotes = snapshot.size;
                let totalViews = 0;
                let totalDownloads = 0;

                snapshot.forEach(doc => {
                    const note = doc.data();
                    totalViews += note.views || 0;
                    totalDownloads += note.downloads || 0;
                });

                document.getElementById('totalNotes').textContent = totalNotes;
                document.getElementById('totalViews').textContent = totalViews;
                document.getElementById('totalDownloads').textContent = totalDownloads;
            });
    }
}

// Show Message
function showMessage(message, type) {
    const messageDiv = document.getElementById('uploadMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'message ' + type;
        setTimeout(() => {
            messageDiv.className = 'message';
        }, 5000);
    }
}

console.log('Admin panel loaded. Firebase integration ready.');