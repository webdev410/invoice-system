let companies = document.querySelector('.companies')
let companyCard = document.querySelector('.all-companies')
let contactCard = document.querySelector('.all-contacts')
let welcome = document.querySelector('.welcome')
let welcomeBtn = document.querySelector('.welcomeBtn')
let regularAddCompanyBtn = document.querySelector('.regularAddCompanyBtn')

console.log(companies.childElementCount)

if (companies.childElementCount === 0) {
    companyCard.setAttribute('style', 'display:none;')
    contactCard.setAttribute('style', 'display:none;')
    welcome.setAttribute('style', 'display: block')
    welcomeBtn.setAttribute('style', 'display: block')
    // regularAddCompanyBtn.setAttribute('style', 'display: none')

} if (companies.childElementCount > 0) {

    // regularAddCompanyBtn.setAttribute('style', 'display: block')
    companyCard.setAttribute('style', 'display:block;')
    contactCard.setAttribute('style', 'display:block;')
    welcome.setAttribute('style', 'display: none;')
    welcomeBtn.setAttribute('style', 'display: none;')

}
//
// document.addEventListener("DOMContentLoaded", function (event) {
//     const showNavbar = (toggleId, navId, bodyId, headerId) => {
//         const toggle = document.getElementById(toggleId),
//             nav = document.getElementById(navId),
//             bodypd = document.getElementById(bodyId),
//             headerpd = document.getElementById(headerId)
// 
//         // Validate that all variables exist
//         if (toggle && nav && bodypd && headerpd) {
//             toggle.addEventListener('click', () => {
//                 // show navbar
//                 nav.classList.toggle('show')
//                 // change icon
//                 toggle.classList.toggle('bx-x')
//                 // add padding to body
//                 bodypd.classList.toggle('body-pd')
//                 // add padding to header
//                 headerpd.classList.toggle('body-pd')
//             })
//         }
//     }
// 
//     showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
// 
//     /*===== LINK ACTIVE =====*/
//     const linkColor = document.querySelectorAll('.nav_link')
// 
//     function colorLink() {
//         if (linkColor) {
//             linkColor.forEach(l => l.classList.remove('active'))
//             this.classList.add('active')
//         }
//     }
//     linkColor.forEach(l => l.addEventListener('click', colorLink))
// 
//     // Your code to run since DOM is loaded and ready
// });