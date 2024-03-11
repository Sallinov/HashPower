import { markerPositionChange } from '../components/header'

const $anchors = document.querySelectorAll('.js-anchor')
const $header = document.querySelector('.js-header')
let statusAnchorClick = false
let buffer_scroll_position = window.scrollY

function activeByScroll () {
    $anchors.forEach($anchor => {
        const topScroll = window.scrollY
        const $target = document.querySelector($anchor.getAttribute('href'))
        const min = $target.offsetTop - ($header.offsetHeight * 2)
        const max = $target.offsetTop + $target.offsetHeight - ($header.offsetHeight * 2)
        if (topScroll >= min && topScroll <= max) {
            markerPositionChange($anchor.closest('.header__list-item'))
        }
    })
}

function initAnchor () {
    $anchors.forEach($anchor => {
        $anchor.onclick = event => {
            statusAnchorClick = true
            event.preventDefault()
            const href = $anchor.getAttribute('href')
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            })
        }
    })
    window.addEventListener('scroll', () => {
        if (!statusAnchorClick) {
            activeByScroll()
        } else {
            buffer_scroll_position = window.scrollY
        }
    })

    window.addEventListener('scrollend', () => {
        statusAnchorClick = !buffer_scroll_position === window.scrollY
    })

    window.addEventListener('DOMContentLoaded', activeByScroll())
}

export default {
    init: initAnchor
}