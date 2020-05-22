// Getting reference to the content view to populate information from Firestore
const interviewList = document.querySelector('.interview-list');

// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');
const content = document.querySelector('.content');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
    content.classList.toggle('push');
})

const openAccount = document.getElementById('account-open'); // trigger button
const account_modal_container = document.getElementById('account_modal_container'); // the container to appear after trigger
const account_close = document.getElementById('account_close');
const openLogin = document.getElementById('login-open');

const openInterview = document.getElementById('interview-open');
const interview_modal_container = document.getElementById('interview_modal_container');
const login_modal_container = document.getElementById('login_modal_container');

openAccount.addEventListener('click', () => {
    ul.classList.toggle('show'); // When in mobile view
    content.classList.toggle('push'); // When in mobile view
    account_modal_container.classList.add('show');
})
account_close.addEventListener('click', () => {
    account_modal_container.classList.remove('show');
})
openInterview.addEventListener('click', () => {
    ul.classList.toggle('show'); // When in mobile view
    content.classList.toggle('push'); // When in mobile view
    interview_modal_container.classList.add('show');
})

account_close.addEventListener('click', () => {
    account_modal_container.classList.remove('show');
})

interview_close.addEventListener('click', () => {
    interview_modal_container.classList.remove('show');
})

openLogin.addEventListener('click', () => {
    ul.classList.toggle('show');
    login_modal_container.classList.add('show');
});

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
                        <iframe id="video_link" width="100%" height="315" src="https://www.youtube.com/embed/M3BM9TB-8yA"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div class="info">
                        <span id="name">${interview.name}</span>
                        <p id="bio">${interview.bio}</p>
                        <a id="website" href="${interview.website}" target="_blank" rel="noopener">Receive Gift</a>
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