const thankyou_modal_container = document.getElementById('thankyou_modal_container');
const thankyou_close = document.getElementById('thankyou_close');


/**
 * Sign up User through opt in
 * Take email and password and authenticate
 * Take name and store in users collection
 */
const submitOptinInfo = document.querySelector('#opt-in-form')
submitOptinInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from sign up form
    const email = submitOptinInfo['opt-in-email'].value;
    const password = submitOptinInfo['opt-in-password'].value

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
            email: submitOptinInfo['opt-in-email'].value,
            name: submitOptinInfo['opt-in-name'].value
        })
    }).then(() => {
        console.log('Info Submitted to Firebase...')
        submitOptinInfo.reset();
        submitOptinInfo.querySelector('.error').innerHTML = '';
        thankyou_modal_container.classList.add('show'); // trigger the opening of the modal
    }).catch(err => {
        submitOptinInfo.querySelector('.error').innerHTML = err.message;
       
    })
})

// close modal triggered by button
thankyou_close.addEventListener('click', () => {
    thankyou_modal_container.classList.remove('show');
});