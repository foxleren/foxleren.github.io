let menu = document.querySelector('.menu-link-container')
let menuWindow = document.querySelector('.menu-window')

menu.addEventListener('click', function () {
    menuWindow.classList.toggle('open')
})