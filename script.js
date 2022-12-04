const slider = document.querySelector('.slider');
const current = document.querySelector('.slider-current');
const prev = document.querySelector('.slider_btn_left');
const next = document.querySelector('.slider_btn_right');
const oldChildren = document.querySelector('.frame');
const menuOpen = document.querySelector('.menu-open');
let frames = document.querySelectorAll('.frame1');
const burgerAll = '#burger';
const burgerMenu = document.querySelector('.burger-menu');
const burgerId = document.querySelector(burgerAll);
const body = document.querySelector('body');



let isSliderAnimationFinished = true;


let direction;

//SLIDER PETS

frames.forEach(frame => {
    frame.addEventListener ('transitionend', (e) => {
        e.stopImmediatePropagation();
    })
})

function getRandomCardSet() {
    const sliderFrames = document.querySelectorAll('.slider-frames');
    for (let i = 0; i < sliderFrames.length; i++){
        if (i !== 1) {
            let sortedFrames = [...sliderFrames[i].children].sort((a,b) => 0.5 - Math.random());
            sliderFrames[i].innerHTML = '';
            sortedFrames.forEach(frame => {
            sliderFrames[i].appendChild(frame);
        })
    }}
}

prev.addEventListener('click', function () {
    if (isSliderAnimationFinished) {
        isSliderAnimationFinished = false;
        getRandomCardSet();
        direction = 1
        slider.style.transform = 'translate(33.3333%)';
    }
});

next.addEventListener('click', function() {
    if (isSliderAnimationFinished) {
        isSliderAnimationFinished = false;
        getRandomCardSet();
        direction = -1;
        slider.style.transform = 'translate(-33.3333%)';
    }
});

slider.addEventListener('transitionend', () => {
    const sliderFrames = document.querySelectorAll('.slider-frames');
    if (direction === -1) {
        slider.appendChild(sliderFrames[0]);
    } else if( direction === 1) {
        slider.prepend(sliderFrames[sliderFrames.length-1]);
    }

    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(function(){
        slider.style.transition = 'all ease 1s';
    })
    isSliderAnimationFinished = true;
})

// SLIDER PETS END

//BURGER-MENU

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    if( burgerMenu.classList.contains('active')) {
        menuOpen.style.display = 'initial';
        body.classList.add('hidden-body');
    } else {
        menuOpen.style.display = 'none';
        body.classList.remove('hidden-body');
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

//BURGER-MENU END

//TESTIMONIALS SLIDER
const inputRange = document.querySelector('.slider_testimonials');
const commentCard = document.querySelector('.comment_card_wrapper');
const comments = document.querySelector('.comments');
let cardWidth = commentCard.offsetWidth;
let cardsCount = Math.round(comments.offsetWidth / cardWidth);
let gap = (comments.offsetWidth - (cardsCount * cardWidth)) / (cardsCount - 1);

function resizeResetTestimonials() {
    cardWidth = commentCard.offsetWidth;
    cardsCount = Math.round(comments.offsetWidth / cardWidth);
    gap = (comments.offsetWidth - (cardsCount * cardWidth)) / (cardsCount - 1);
    inputRange.value = 0;
    comments.style.marginLeft = '0';
};

window.onresize = resizeResetTestimonials;

inputRange.addEventListener('change', () => {
    const toBeMarginLeft = cardWidth + gap;
    comments.style.marginLeft = '0';
    comments.style.marginLeft = `-${inputRange.value * toBeMarginLeft}px`;
})

// TESTIMONIALS POPUP

const reviews = document.querySelectorAll('.comment_card_wrapper');
const testimonialsContainer = document.querySelector('.testimonials_container');
console.log(reviews)

reviews.forEach( review => {
    review.addEventListener('click', () => {
        if (window.innerWidth <= 640) {
            let cardClone = review.cloneNode(true);
            let popupWrapper = document.createElement('div');
            let popupCardContainer = document.createElement('div');
            let popupCardCloseBtn = document.createElement('button');
            popupCardCloseBtn.innerHTML= '+'
            popupCardContainer.appendChild(popupCardCloseBtn);
            popupCardContainer.appendChild(cardClone);
            popupWrapper.appendChild(popupCardContainer)
            body.appendChild(popupWrapper);
            popupWrapper.classList.add('popup-review-wrapper')
            popupCardContainer.classList.add('popup-container');
            popupCardCloseBtn.classList.add('popup-review-close-btn');

            popupCardCloseBtn.addEventListener('click', closePopup);
            body.classList.add('hidden-body');

            popupWrapper.addEventListener('click', function(e) {
                if(e.target === popupWrapper) {
                    closePopup();
                }
            })

            function closePopup() {
                body.removeChild(popupWrapper);
                body.classList.remove('hidden-body');

            }
    }
})
})





