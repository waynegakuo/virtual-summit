// Show popup when user wants to leave page
const exitintent_modal_container = document.getElementById('exitintent_modal_container');
const exit_close = document.getElementById('exit_close');

function onMouseOut(event) {
    // If the mouse is near the top of the window, show the popup
    // Also, do NOT trigger when hovering or clicking on selects
    if (
        event.clientY < 50 &&
        event.relatedTarget == null &&
        event.target.nodeName.toLowerCase() !== 'select') {
        // Remove this event listener
        document.removeEventListener("mouseout", onMouseOut);

        // Show the popup
        exitintent_modal_container.classList.add('show'); // trigger the opening of the modal
    }
}
document.addEventListener("mouseout", onMouseOut);
// close modal triggered by exit intent button
exit_close.addEventListener('click', () => {
    exitintent_modal_container.classList.remove('show');
});


// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');
const content = document.querySelector('.content');
const banner = document.querySelector('.banner');
const sessionAnchor = document.getElementById('session-anchor');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
    content.classList.toggle('push');
    banner.classList.toggle('push');
})

sessionAnchor.addEventListener('click', () => {
    ul.classList.toggle('show');
    content.classList.toggle('push');
    banner.classList.toggle('push');
})

// Open Account by clicking menu item

const openAccount = document.getElementById('account-open');
const account_modal_container = document.getElementById('account_modal_container');
const account_close = document.getElementById('account_close');

openAccount.addEventListener('click', () => {
    ul.classList.toggle('show');
    banner.classList.toggle('push');
    content.classList.toggle('push'); // When in mobile view
    account_modal_container.classList.add('show');
})
account_close.addEventListener('click', () => {
    account_modal_container.classList.remove('show');
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
            <div>Bio: ${doc.data().name}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
        `;
            accountDetails.innerHTML = html;

        })
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else { // When logged out
        // Hide admin items
        adminItems.forEach(item => item.style.display = 'none')
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}