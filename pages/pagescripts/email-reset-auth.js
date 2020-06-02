const passreset_modal_container = document.getElementById('passreset_modal_container');
const passreset_close = document.getElementById('passreset_close');
/**
 * Send Email Reset Notification to User through Firebase
 */
const emailResetForm = document.querySelector('.reset-actions');

emailResetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const resetEmail = document.querySelector('#reset-email').value;

    auth.sendPasswordResetEmail(resetEmail).then(function () {
        // Email sent.
        passreset_modal_container.classList.add('show'); // trigger the opening of the modal
    }).catch(err => {
        emailResetForm.querySelector('.error').innerHTML = err.message;
    });
})


// close modal triggered by button
passreset_close.addEventListener('click', () => {
    passreset_modal_container.classList.remove('show');
    window.location.href = 'interview.html'
});