// Toggle menu items in mobile view
const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');
const content = document.querySelector('.content');

burger.addEventListener('click', () => {
    ul.classList.toggle('show');
    content.classList.toggle('push');
})