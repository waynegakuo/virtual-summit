// Getting reference to the content view to populate information from Firestore
const interviewList = document.querySelector('.interview-list');

// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');
const content = document.querySelector('.content');
const banner = document.querySelector('.banner');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
    content.classList.toggle('push');
    banner.classList.toggle('push');
})

// Open modals for Login, Signups, Account and Create Interview by clicking menu item
const openLogin = document.getElementById('login-open');
const openSignUp = document.getElementById('signup-open');
const openAccount = document.getElementById('account-open');
const openInterview = document.getElementById('interview-open');

const login_modal_container = document.getElementById('login_modal_container');
const signup_modal_container = document.getElementById('signup_modal_container');
const account_modal_container = document.getElementById('account_modal_container');
const interview_modal_container = document.getElementById('interview_modal_container');
const login_close = document.getElementById('login_close');
const signup_close = document.getElementById('signup_close');
const account_close = document.getElementById('account_close');
const interview_close = document.getElementById('interview_close')

openLogin.addEventListener('click', () => {
    ul.classList.toggle('show');
    banner.classList.toggle('push');
    login_modal_container.classList.add('show');
});

openSignUp.addEventListener('click', () => {
    ul.classList.toggle('show');
    banner.classList.toggle('push');
    signup_modal_container.classList.add('show');
});

openAccount.addEventListener('click', () => {
    ul.classList.toggle('show');
    banner.classList.toggle('push');
    account_modal_container.classList.add('show');
})

openInterview.addEventListener('click', () => {
    ul.classList.toggle('show');
    banner.classList.toggle('push');
    interview_modal_container.classList.add('show');
})

login_close.addEventListener('click', () => {
    login_modal_container.classList.remove('show');
});

signup_close.addEventListener('click', () => {
    signup_modal_container.classList.remove('show');
});
account_close.addEventListener('click', () => {
    account_modal_container.classList.remove('show');
})
interview_close.addEventListener('click', () => {
    interview_modal_container.classList.remove('show');
})

// Getting access to menu items for showing/hiding based on authentication
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

// Reference link to interviews in the landing page
const viewInterviews = document.querySelector('.view-interviews');


// Reference to the account pop-up
const accountDetails = document.querySelector('.account-details');

// Reference to admin section
const adminItems = document.querySelectorAll('.admin');

/**
 * Set up UI
 * checks if the user exists/logged in, and also checks if the user logged in 
 * is an admin ~ gets called in the auth.js
 * @param {*} user 
 */
const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            // Display admin items if the user logged in has the admin property (if is an admin)
            adminItems.forEach(item => item.style.display = 'block')
        }
        // Show account info & use the user's unique id to query the firestore for a specific document in a specific collection
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>Bio: ${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
        `;
            accountDetails.innerHTML = html;
            
        })
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        viewInterviews.style.display = 'flex'
    }
    else { // When logged out
        // Hide admin items
        adminItems.forEach(item => item.style.display = 'none')
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        viewInterviews.style.display = 'none'
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}