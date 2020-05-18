// Getting reference to the content view to populate information from Firestore
const interviewList = document.querySelector('.interview-list');

// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
})

// Open modals for Login or Signups
const openLogin = document.getElementById('login-open');
const openSignUp = document.getElementById('signup-open');

const login_modal_container = document.getElementById('login_modal_container');
const signup_modal_container = document.getElementById('signup_modal_container');
const login_close = document.getElementById('login_close');
const signup_close = document.getElementById('signup_close');

openLogin.addEventListener('click', () => {
    login_modal_container.classList.add('show');
});

openSignUp.addEventListener('click', () => {
    signup_modal_container.classList.add('show');
});

login_close.addEventListener('click', () => {
    login_modal_container.classList.remove('show');
});

signup_close.addEventListener('click', () => {
    signup_modal_container.classList.remove('show');
});

/**
 * Set up interviews to be viewed 
 * will take in data from auth.js method of getting data from the firestore collection 
 * and cycle through and output a guide for each element inside that data array
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