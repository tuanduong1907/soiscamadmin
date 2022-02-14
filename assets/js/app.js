const headerMenu = document.querySelector('.header-menu')
const navList = document.querySelector('.nav__list')
const navClose = document.querySelector('.nav__close')


// Function
function closeMenu() {
    navList.classList.remove('active')
}

// Event
headerMenu.addEventListener('click', (e) =>{
    e.stopPropagation()
    navList.classList.toggle('active')
})

navList.addEventListener('click', (e) =>{
    e.stopPropagation()
})

navClose.addEventListener('click', closeMenu)

document.body.addEventListener('click', (e) =>{
    e.stopPropagation()
    const active = document.querySelector('.active')
    if(active) {
        closeMenu()
    }
})