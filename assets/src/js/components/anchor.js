function initAnchor () {
    const $anchors = document.querySelectorAll('.js-anchor')
    const $header = document.querySelector('.js-header')

    $anchors.forEach($anchor => {
        $anchor.onclick = event => {
            event.preventDefault()
            const href = $anchor.getAttribute('href')
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            })
            window.scroll({
                top: document.querySelector(href).offsetTop - $header.offsetHeight, 
                left: 0, 
                behavior: 'smooth' 
            });
        }
    })
}

export default {
    init: initAnchor
}