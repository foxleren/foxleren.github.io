let menu = document.querySelector('.menu-name')
let menuWindow = document.querySelector('.menu-window')

menu.addEventListener('click', function () {
    menuWindow.classList.toggle('open')
})