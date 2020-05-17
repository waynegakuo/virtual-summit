// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', ()=> {
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