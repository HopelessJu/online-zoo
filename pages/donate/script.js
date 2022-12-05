const menuOpen = document.querySelector('.menu-open');
const burgerAll = '#burger';
const burgerMenu = document.querySelector('.burger-menu');
const burgerId = document.querySelector(burgerAll);
const body = document.querySelector('body');

let inputGroup = document.querySelectorAll('.radio_input');
let customInput = document.querySelector('.custom_input');

inputGroup.forEach(input => {
    input.addEventListener('click', () => {
        console.log(input.value)
        customInput.value = input.value
    })
})

customInput.addEventListener('input', () => {
    let customValue = customInput.value;
    console.log(customValue);
    inputGroup.forEach(input => {
        input.removeAttribute('checked');
        if( input.value === customValue) {
            setTimeout(() => input.setAttribute('checked', true), 0);
        }
    })
})

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    if( burgerMenu.classList.contains('active')) {
        menuOpen.style.display = 'initial';
        body.classList.add('hidden-body')
    } else {
        menuOpen.style.display = 'none'
        body.classList.remove('hidden-body')

    }
})
document.addEventListener('click', (e) => {
    const isClosest = e.target.closest(burgerAll);
    if (burgerMenu.classList.contains('active') && e.target !== burgerMenu && !isClosest) {
        burgerMenu.classList.remove('active');
        menuOpen.style.display = 'none'
        body.classList.remove('hidden-body')
    }
})

