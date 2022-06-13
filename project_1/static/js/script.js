'use strict'
function showActiveLink(menu) {
    try {
        let links = document.getElementById(menu).querySelectorAll('a')
        let url = document.location.href
        for (const link of links) {
            if (link.href == url) {
                link.classList.add('active');
            }
        }
    } catch {

    }
}
showActiveLink('menu')