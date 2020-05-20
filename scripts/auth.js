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
        console.log('User logged in')
    }
    else {
        setupUI()
        unsubscribe();
        console.log('User logged out');
    }
});
// Log out user
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})