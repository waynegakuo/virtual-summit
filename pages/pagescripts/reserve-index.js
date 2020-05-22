const thankYouModal = document.querySelector('.thanks_test')

const thankyou_modal_container = document.getElementById('thankyou_modal_container');
const thankyou_close = document.getElementById('thankyou_close');

thankYouModal.addEventListener('click', (e) => {
    e.preventDefault();
    thankyou_modal_container.classList.add('show'); // trigger the opening of the modal
})

// close modal triggered by button
thankyou_close.addEventListener('click', () => {
    thankyou_modal_container.classList.remove('show');
});