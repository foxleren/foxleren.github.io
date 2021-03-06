/*-- Появление меню --*/
let menu = document.querySelector('.menu-link-container')
let menuWindow = document.querySelector('.menu-window')

menu.addEventListener('click', function () {
    menuWindow.classList.toggle('open')
})
/*-- Анимация появления и исчезновения награды --*/
let trophy = document.querySelectorAll('.trophy-container')
let trophyBig = document.querySelectorAll('.trophyBig-background')

for (let i = 0; i < trophy.length; i++) {
    trophy[i].addEventListener("click", function() {
        trophyBig[i].classList.toggle('open')
    })
}

for (let i = 0; i < trophyBig.length; i++) {
    trophyBig[i].addEventListener("click", function() {
        trophyBig[i].classList.toggle('open')
    })
}