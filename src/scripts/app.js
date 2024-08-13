// MENU
const burger = document.querySelector(".burger");
burger.addEventListener('click', () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("menu--active");
})