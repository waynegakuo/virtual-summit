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
    }
    else {
        // Hide admin items
        adminItems.forEach(item => item.style.display = 'none')
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

/**
 * Set up interviews
 * will take in data from auth.js method of getting data from the firestore collection 
 * and cycle through and output an interview for each element inside that data array
 * @param {*} data 
 */
const setupInterviews = (data) => {

    // if we have length, then we output
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const interview = doc.data();
            const list = `
                <div class="interviews">
                    <div class="video">
                        <!-- <iframe id="video_link" width="100%" height="315" src="https://www.youtube.com/embed/M3BM9TB-8yA"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe> -->
                    </div>
                    <div class="info">
                        <span id="name">${interview.name}</span>
                        <p id="bio">${interview.bio}</p>
                        <a id="website" href="${interview.website}" target="_blank" rel="noopener">Follow me</a>
                    </div>
                </div>
            `;

            html += list;
        });

        interviewList.innerHTML = html;
    }

    //if we don't have the length, instead of showing nothing, we show some information
    else {
        interviewList.innerHTML = '<h5>Login to view interviews posted</h5>'
    }
}