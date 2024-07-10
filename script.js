const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.slider-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const zoomInBtn = document.querySelector('.zoom-in');
const zoomOutBtn = document.querySelector('.zoom-out');
const slides = document.querySelectorAll('.slide img');

let slideIndex = 0;
let zoomLevel = 1;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;
let startScrollLeft = 0;
let startScrollTop = 0;

// Next button click handler
nextBtn.addEventListener('click', () => {
    slideIndex++;
    slide();
});

// Previous button click handler
prevBtn.addEventListener('click', () => {
    slideIndex--;
    slide();
});

function slide() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    slider.style.transform = `translateX(${-slideIndex * 100}%)`;
}

// Dragging functionality
slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startDragX = e.pageX;
    startDragY = e.pageY;
    startScrollLeft = slider.scrollLeft;
    startScrollTop = slider.scrollTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dragX = e.pageX - startDragX;
    const dragY = e.pageY - startDragY;
    slider.scrollLeft = startScrollLeft - dragX;
    slider.scrollTop = startScrollTop - dragY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch events for mobile devices
slider.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startDragX = touch.clientX;
    startDragY = touch.clientY;
    startScrollLeft = slider.scrollLeft;
    startScrollTop = slider.scrollTop;
});

slider.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) return; // Ignore multi-touch

    const touch = e.touches[0];
    const dragX = touch.clientX - startDragX;
    const dragY = touch.clientY - startDragY;
    slider.scrollLeft = startScrollLeft - dragX;
    slider.scrollTop = startScrollTop - dragY;
});

slider.addEventListener('touchend', () => {
    // Do nothing for now
});

// Zoom in and zoom out functionality
zoomInBtn.addEventListener('click', () => {
    zoomLevel += 0.5;
    applyZoom();
});

zoomOutBtn.addEventListener('click', () => {
    zoomLevel = 1; // Reset zoom level to 1 (original size)
    applyZoom();
});

function applyZoom() {
    slides.forEach(slide => {
        slide.style.transform = `scale(${zoomLevel})`;
        slide.style.transformOrigin = `center top`; // Set transform origin to center top
    });

    if (zoomLevel > 1) {
        slides.forEach(slide => {
            slide.parentElement.style.overflowY = 'auto';
            slide.parentElement.style.overflowX = 'hidden';
        });
    } else {
        slides.forEach(slide => {
            slide.parentElement.style.overflowY = 'hidden';
        });
    }
}
