// Getting reference to the content view to populate information from Firestore
const interviewList = document.querySelector('.interview-list');

// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
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
    login_modal_container.classList.add('show');
});

openSignUp.addEventListener('click', () => {
    signup_modal_container.classList.add('show');
});

openAccount.addEventListener('click', () => {
    account_modal_container.classList.add('show');
})

openInterview.addEventListener('click', () => {
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
const optInForm = document.querySelector('#opt-in-form');


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
            optInForm.style.display ='none'; // Hide the opt-in form if user signed in is an admin
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
        optInForm.style.display ='none'; // Hide opt-in form if user is signed in
    }
    else {
        // Hide admin items
        adminItems.forEach(item => item.style.display = 'none')
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        optInForm.style.display ='flex'; // Show opt-in form if user is signed in
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}