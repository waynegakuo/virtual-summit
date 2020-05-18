const submitOptinInfo = document.querySelector('#opt-in-form');

/**
 * Listen for auth status changes
 * When you call the onSnapshot method, it returns an object 
 * that you can use to unsubscribe from the listener and prevent the error.
 * param @user
 */
let unsubscribe = () => { };
auth.onAuthStateChanged(user => {
    if (user) { // fires is user is logged in
        // user.getIdTokenResult().then(idTokenResult => {
        //     // console.log(idTokenResult.claims);
        //     user.admin = idTokenResult.claims.admin; // attaching the admin property to the user temporarily ~ solves issue of log out -log in
        //     setupUI(user)
        // })
        // Get data from Firestore using Realtime listener
        unsubscribe = db.collection('interviews').onSnapshot(snapshot => {
            setupInterviews(snapshot.docs) // this method is in the index.js file
        })
        console.log('User logged in')
    }
    else {
        // setupUI()
        setupInterviews([])
        unsubscribe();
        console.log('User logged out');
    }
});

// Get email and name for opt in
submitOptinInfo.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = submitOptinInfo['opt-in-email'].value;
    const name = submitOptinInfo['opt-in-name'].value
    console.log('Submitting info to Firebase...', email, name)
})

// Sign up User
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from sign up form
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    // Sign up the user via Firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        /**
         * Instead of using the normal add() we use doc() since we want to dictate the ID that would be generated/stored
         * Firebase will check for the users collection. If it doesn't exist, it creates it for you 
         * (however one needs to change the security rules in Firebase to allow the reading and writing of new collections)
         * then we use the set() to add documents into our collections such as: gender, bio, first name, last name
         * 
         * The users collection is created with each document ID being the same as the generated user's ID (cred)
         * upon authentication (sign up). Each document is one user
         */
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        const signup_modal_container = document.querySelector('#signup_modal_container')
        signup_modal_container.classList.remove('show');
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})

// Log in user
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from login form
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Log in the user via Firebase
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
        // Close login modal and reset the form
        const login_modal_container = document.querySelector('#login_modal_container')
        login_modal_container.classList.remove('show');
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})

// Log out user
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})