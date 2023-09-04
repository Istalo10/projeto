const images = document.querySelectorAll('.image'); 
const overlay = document.querySelector('.overlay'); 
const overlayImage = document.querySelector('.overlay-image'); 
const closeBtn = document.querySelector('.close-btn'); 
const prevBtn = document.querySelector('.prev-btn'); 
const nextBtn = document.querySelector('.next-btn'); 
let currentIndex = 0; images.forEach((image, index) => { image.addEventListener('click', () => { currentIndex = index; showImage(); }); }); 
closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; }); prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(); }); 
nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % images.length; showImage(); }); function showImage() 
{ const imageUrl = images[currentIndex].style.backgroundImage.slice(5, -2); overlayImage.src = imageUrl; overlay.style.display = 'block'; }
