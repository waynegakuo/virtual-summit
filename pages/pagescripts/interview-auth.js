/**
 * Listen for auth status changes
 * When you call the onSnapshot method, it returns an object 
 * that you can use to unsubscribe from the listener and prevent the error.
 * param @user
 */
let unsubscribe = () => { };
auth.onAuthStateChanged(user => {
    if (user) { // fires is user is logged in
        user.getIdTokenResult().then(idTokenResult => {
            // console.log(idTokenResult.claims);
            user.admin = idTokenResult.claims.admin; // attaching the admin property to the user temporarily ~ solves issue of log out -log in
            setupUI(user)
        })
        // Get data from Firestore using Realtime listener
        unsubscribe = db.collection('interviews').onSnapshot(snapshot => {
            setupInterviews(snapshot.docs) // this method is in the index.js file
        })
        console.log('User logged in')
    }
    else {
        setupUI()
        setupInterviews([])
        unsubscribe();
        console.log('User logged out');
    }
});

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